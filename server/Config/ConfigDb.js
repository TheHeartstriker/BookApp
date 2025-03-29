import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.MY_DB,
  process.env.MY_USER,
  process.env.MY_PASS,
  {
    host: process.env.MY_HOST,
    dialect: "mysql",
  }
);

export default sequelize;
