var Sequelize = require('sequelize-cockroachdb');
var models = require('../models');

models.sequelize.sync({force: true}).then(function() {
  // Seed User
  models.User.create({
    id: "1161676737297024",
    name: "Paul Local",
    email: "pbardea+local@gmail.com",
    picture: "http://www.example.com"
  });

  models.User.create({
    id: "1184507718347259",
    name: "Paul Prod",
    email: "pbardea+prod@gmail.com",
    picture: "http://www.example.com"
  });

  models.User.create({
    id: "10215703425365000",
    name: "Yemin Prod",
    email: "yemins@email.com",
    picture: "http://www.example.com"
  });

  models.User.create({
    id: "10215367807374760",
    name: "Yemin Local",
    email: "yemins@email.com",
    picture: "http://www.example.com"
  });

  models.User.create({
    id: "1860435200650659",
    name: "Tammy Prod",
    email: "hello+prod@tammyliu.me",
    picture: "http://www.example.com"
  });

  models.User.create({
    id: "1824104227617090",
    name: "Tammy Local",
    email: "hello+local@tammyliu.me",
    picture: "http://www.example.com"
  });

  models.User.create({
    id: "abc",
    name: "Ginko",
    email: "ginko@gmail.com",
    picture: "http://www.example.com"
  });

  models.User.create({
    id: "846707232167446",
    name: "Justin Local",
    email: "justin+local@gmail.com",
    picture: "http://www.example.com"
  });

  models.User.create({
    id: "848173762020793",
    name: "Justin Prod",
    email: "justin@gmail.com",
    picture: "http://www.example.com"
  });

  models.Trip.create({
    id: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
    author: "1161676737297024",
    name: "Paris - Grad Trip '19!'",
    description: "La vie est belle.",
    picture: "https://www.everettpotter.com/wp-content/uploads/2015/05/header.jpg"
  });

  models.Trip.create({
    id: "0049afbc-24fc-457d-8aa8-905c24dda41d",
    author: "1161676737297024",
    name: "South Bay Vacay",
    description: "Zzzz"
  });

  // Add Everyone to Paris Trip
  models.UserTrip.create({
    userId: "1161676737297024", // Paul Local
    tripId: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
  });
  models.UserTrip.create({
    userId: "1184507718347259", // Paul Prod
    tripId: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
  });
  models.UserTrip.create({
    userId: "1824104227617090", // Tammy Local
    tripId: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
  });
  models.UserTrip.create({
    userId: "1860435200650659", // Tammy Prod
    tripId: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
  });
  models.UserTrip.create({
    userId: "10215703425365000", // Yemin Prod
    tripId: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
  });
  models.UserTrip.create({
    userId: "10215367807374760", // Yemin Local
    tripId: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
  });
  models.UserTrip.create({
    userId: "846707232167446", // Justin
    tripId: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
  });


  // Add Paul to Cali
  models.UserTrip.create({
    userId: "1161676737297024",
    tripId: "0049afbc-24fc-457d-8aa8-905c24dda41d",
  });
  models.UserTrip.create({
    userId: "846707232167446",
    tripId: "0049afbc-24fc-457d-8aa8-905c24dda41d",
  });
  models.UserTrip.create({
    userId: "abc",
    tripId: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
  });

  // Seed card for paris trip
  models.Card.create({
    id: "3176daf7-ea72-4444-b2be-7d2f466af8d0",
	trip: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
    title: "Eiffel Tower",
    description: "The brilliant tower!",
    location: "Place Charles de Gaulle, 75008 Paris, France",
    duration: 20.0,
    order: 0,
    startTime: Date.now(),
    creator: "1161676737297024"
  });
  models.Card.create({
    id: "48df18dc-c32d-4db0-827c-608dc42c22ea",
	trip: "6347f1fc-64d1-4f8b-ac79-44d59d130b6d",
    title: "Arc de Triomphe",
    description: "Beautiful arch in the middle of a great roundabout. About 400 steps to the top.",
    location: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France",
    duration: 20.0,
    order: 0,
    startTime: Date.now(),
    creator: "1161676737297024"
  })

  // Seed card for south bay trip
  models.Card.create({
    id: "bd6425fa-c8e6-4401-80ea-83614021f2d1",
	  trip: "0049afbc-24fc-457d-8aa8-905c24dda41d",
    title: "Googleplex",
    description: "A bunch of building. With Android statues!",
    location: "1 Ampitheatre Dr.",
    duration: 20.0,
    order: 0,
    startTime: Date.now(),
    creator: "1161676737297024"
  })

  // Seed thread
  models.Thread.create({
    id: "5b2ab182-cf6a-4f97-ba81-630f29df375d",
    cardId: "48df18dc-c32d-4db0-827c-608dc42c22ea",
    resolved: false,
    topic: "I AM ALERGIC TO FISH!",
    content: "Let's talk about this.",
    options: "['Go somewhere else', 'Sucks. You gonna starve.']",
    answers: "[2, 34]",
    replies: "['d3f82eb4-44f5-4969-9319-029eb6444e82']"
  });
  models.Thread.create({
    id: "15b4c2d1-9e20-476d-9407-a4b7e80c7e83",
    cardId: "48df18dc-c32d-4db0-827c-608dc42c22ea",
    resolved: false,
    topic: "I WANT TO BE HEARD! THAT IS ALL!",
    replies: "[4ae498bb-fd2a-4e45-acfe-d22bfee7c415]"
  });

  // Seed message
  models.Message.create({
    id: "d3f82eb4-44f5-4969-9319-029eb6444e82",
    threadId: "15b4c2d1-9e20-476d-9407-a4b7e80c7e83",
    authorId: "1161676737297024",
    content: "This is a message!"
  });
  models.Message.create({
    id: "4ae498bb-fd2a-4e45-acfe-d22bfee7c415",
    threadId: "15b4c2d1-9e20-476d-9407-a4b7e80c7e83",
    authorId: "1161676737297024",
    content: "This is another message!"
  });
});

// FIXME: Hack because I spent over an hour on this and I'm sick of it.
setTimeout(() => process.exit(), 5000);
