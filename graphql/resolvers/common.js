// Importing Models
const Event = require("../../models/event");
const User = require("../../models/user");

const transformBooking = async (booking) => {
  return {
    ...booking._doc,
    user: await user(booking._doc.user),
    event: await getSingleEvent(booking._doc.event),
    createdAt: new Date(booking._doc.createdAt).toISOString(),
    updatedAt: new Date(booking._doc.updatedAt).toISOString(),
  };
};

const transformEvent = async (event) => {
  return {
    ...event._doc,
    date: new Date(event._doc.date).toISOString(),
    creator: await getCreatorDetails(event.creator),
  };
};

const getCreatorDetails = async (userId) => {
  const user = await User.findById(userId);
  const eventsData = await Event.find({ _id: { $in: user.createdEvents } });
  const createdEventsData = await Promise.all(
    eventsData.map(async (event) => {
      return {
        ...event._doc,
        date: new Date(event._doc.date).toISOString(),
        creator: await getSingleUser(event._doc.creator),
      };
    })
  );

  return {
    ...user._doc,
    createdEvents: createdEventsData,
  };
};

const getSingleUser = async (userId, email = null) => {
  let user = [];
  if (email) {
    user = await User.find({ email: email });
  } else {
    user = await User.findById(userId);
  }
  return user;
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    user.createdEvents = await events(user.createdEvents);
    return user;
  } catch (err) {
    console.log("error while geting user details by id...", err);
    throw err;
  }
};

const events = async (eventIds) => {
  try {
    const eventsData = await Event.find({ _id: { $in: eventIds } });
    return await Promise.all(
      eventsData.map(async (event) => {
        return await transformEvent(event);
      })
    );
  } catch (err) {
    console.log("Error while fetching events data....", err);
    throw err;
  }
};

const getSingleEvent = async (eventId) => {
  try {
    const event = await Event.findOne({ _id: eventId });
    return await transformEvent(event);
  } catch (err) {
    console.log("Error wile fetching single event data ...", err);
  }
};

module.exports = {
  transformBooking,
  transformEvent,
  getCreatorDetails,
  getSingleUser,
  user,
  events,
  getSingleEvent,
};
