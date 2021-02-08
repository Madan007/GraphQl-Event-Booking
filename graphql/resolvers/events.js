// Importing Models
const Event = require("../../models/event");

//commmon import
const { transformEvent } = require("./common");

module.exports = {
  events: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const { title = null } = args;
      const queryString = title ? { title } : {};
      const events = await Event.find(queryString);
      return await Promise.all(
        events.map(async (event) => {
          return await transformEvent(event);
        })
      );
    } catch (err) {
      console.log("Error while fetching events...", err);
      throw err;
    }
  },

  createEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthorized");
      }
      const { title, description, price, date } = args.eventInput;

      const event = new Event({
        title,
        description,
        price: +price,
        date: new Date(date),
        creator: req.userId,
      });

      const eventResult = await event.save();
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("User not found");
      } else {
        user.createdEvents.push(event);
        await user.save();
      }
      // return { ...eventResult._doc };
      return await transformEvent(eventResult);
    } catch (err) {
      console.log("error in create event...", err);
      throw err;
    }
  },
};
