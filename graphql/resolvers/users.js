const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Importing Models
const User = require("../../models/user");

//commmon import
const { user, getSingleUser } = require("./common");

module.exports = {
  login: async (args) => {
    try {
      const { email, password } = args;
      // Check if user exists
      const [existingUser] = await getSingleUser(null, email);
      if (!existingUser) {
        throw new Error("User Does not Exist!");
      }

      // Check if credentials are matching
      const isValidUser = await bcrypt.compare(password, existingUser.password);
      if (!isValidUser) {
        throw new Error("Invalid User Credentials");
      }
      // Generate Token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: `${process.env.TOKEN_EXPIRY}h` }
      );

      const response = {
        userId: existingUser.id,
        token,
        tokenExpiration: process.env.TOKEN_EXPIRY,
      };
      return response;
    } catch (err) {
      console.log("Error in user login....", err);
      throw err;
    }
  },
  createUser: async (args) => {
    try {
      const { email, password } = args.userInput;

      const userDetails = await User.findOne({ email });
      if (userDetails) {
        throw new Error("User with the Email Already Exists");
      } else {
        const hashedPassword = await bcrypt.hash(password, 12);

        const userModel = new User({
          email,
          password: hashedPassword,
        });

        const result = await userModel.save();

        return user(result);
      }
    } catch (err) {
      console.log("Error while creating the user", err);
      throw err;
    }
  },
};
