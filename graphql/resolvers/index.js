const usersResolvers = require("./users");
const eventsResolvers = require("./events");
const bookingsresolvers = require("./bookings");

const rootResolver = {
  ...usersResolvers,
  ...eventsResolvers,
  ...bookingsresolvers,
};

module.exports = rootResolver;
