const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// A model for the User entity in the databas
// And a model is a framework for defining the structure of a database table.
//Bellow is the code and an example of it being used

//
//
// const newUser = await User.create({
// email: "example@gmail.com",
// password: "securepassword123",
// name: "John Doe",
// });
//
//

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
