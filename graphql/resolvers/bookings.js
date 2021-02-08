// Importing Models
const Booking = require("../../models/booking");

//commmon import
const {
  transformBooking,
  transformEvent,
  user,
  getSingleEvent,
} = require("./common");

module.exports = {
  bookings: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const bookings = await Booking.find();
      return Promise.all(
        bookings.map(async (booking) => {
          return transformBooking(booking);
        })
      );
    } catch (err) {
      console.log("Error while fetching Bookings...!!!", err);
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const { eventId } = args;
      const fetchedEventData = await getSingleEvent(eventId);
      const userDetails = await user(req.userId);
      const booking = new Booking({
        user: userDetails,
        event: fetchedEventData,
      });
      const result = await booking.save();
      return await transformBooking(result);
    } catch (err) {
      console.log("Error while creating booking...", err);
      throw err;
    }
  },

  cancelBooking: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const { bookingId } = args;
      const booking = await Booking.findById({ _id: bookingId }).populate(
        "event"
      );
      const event = await transformEvent(booking.event);
      await Booking.deleteOne({ _id: bookingId });

      return event;
    } catch (err) {
      console.log("Error while caneling booking...", err);
      throw err;
    }
  },
};
