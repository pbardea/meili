let Sequelize = require('sequelize-cockroachdb');
let models = require('../models');
let uuidv4 = require('uuid/v4');
let tripCache = require('./partialWritebackCache');

tripCache.setupExpiryHandler(persistTrip);

function persistTrip(key, value, whatChanged) {
    console.log('[storage.js] Cache entry for trip ' + key + ' expired');
    if (whatChanged.size > 0) {
        for (let card of value) {
            if (whatChanged.has(card.id)) {
                console.log('[storage.js] Writing card ' + card.id + ' to DB');
                models.Card.update(card, { where: {id: card.id} });
            }
        }

        // Put the trip back into the cache
        tripCache.setEntry(key, value);
        return;
    }
}

// Fetch trip cards
module.exports.withCardsFromTrip = (tripId, callback) => {
    let trip = tripCache.retrieveEntry(tripId);
    if (trip !== undefined) {
        console.log('[storage.js] Fetching trip: trip was cached');
        callback(trip);
        return;
    }

    console.log('[storage.js] Fetching trip from DB and caching it');

    // Pull data from database
    models.Card.findAll({
        where: {
            trip: tripId,
        },
        order: ['order'],
        raw: true
    }).then((cards) => {
        tripCache.setEntry(tripId, cards);
        callback(cards);
    });
};

// TODO: hook into cache
module.exports.withTripDetails = (tripId, callback) => {
    models.Trip.findById(tripId).then((trip) => {
        callback(trip.dataValues);
    });
}

module.exports.updateTrip = (trip, callback) => {
    models.Trip.update(trip, { where: {id: trip.id}  }).then((trip) => {
        callback(trip);
    });
}

module.exports.updateCard = (tripId, newCard, callback) => {
    module.exports.withCardsFromTrip(tripId, (trip) => {
        // Update cached value
        for (let i = 0; i < trip.length; i++) {
            console.log('[storage.js] ' + trip[i].id);
            if (newCard && trip[i].id == newCard.id) {
                console.log('[storage.js] Mutating cached trip list with update for card ' + trip[i].id);
                trip[i] = newCard;
                // TODO: maybe consider passing in a Set instead of a list since the callback passes back a Set
                tripCache.markAsUpdated(tripId, [trip[i].id]);
                break;
            }
        }
        callback(newCard);
    });
}

module.exports.addCard = (tripId, newCard, callback) => {
	// TODO: implement caching
	tripCache.invalidateEntry(tripId);

	models.Card.create(newCard).then(() => {
        models.Card.findAll({
            where: {
                id: newCard.id,
            },
            raw: true,
        }).then((cards) => {
            callback(cards);
        });
    });
}

module.exports.addThread = (cardId, newThread, callback) => {
  models.Thread.create(newThread).then((createdThread) => {
    callback(cardId);
  });
}

module.exports.addMessage = (threadId, newMessage, callback) => {
  models.Message.findAll({where: {threadId: threadId}}).then((messages) => {
      newMessage['order'] = messages.length + 1;
      console.log("Adding message");
      console.log(newMessage);
      models.Message.create(newMessage).then((msg) => {
          models.Thread.find({
              where: {id: threadId},
              raw: true
          }).then((thread) => {
            callback(thread.cardId);
          });
      });
  })
}

module.exports.getAllCards = (callback) => {
    models.Card.findAll({
        order: ['order'],
        raw: true,
    }).then((cards) => {
        callback(cards);
    });
}

module.exports.deleteCard = (cardId, tripId, callback, notFoundCallback) => {
    tripCache.invalidateEntry(tripId);
    models.Card.findAll({
        where: {
            id: cardId
        },
    }).then((cards) => {
        if (cards.length == 0) {
            notFoundCallback();
        }
    }).then(() => {
        models.Card.destroy({
            where: {
                id: cardId
            }
        }).then(() => {
            callback();
        });
    });
}
