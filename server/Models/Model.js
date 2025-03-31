import { DataTypes } from "sequelize";
import sequelize from "../Config/ConfigDb.js";

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

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    lowercase: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const books = sequelize.define("books", {
  BookId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  BookName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Description: {
    type: DataTypes.STRING,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export { User, books };
