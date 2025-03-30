import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./Routes.js";
import errorHandler from "./MiddleWare/ErrorAuthMiddle.js";
//import routeMiddleware from "./MiddleWare/RouteMiddle.js";

//Configures the environment variables and express
dotenv.config();
const app = express();

//cors options
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

//Middleware
app.use(cors(corsOptions));
app.use(express.json());

//Route Middleware
//app.use(routeMiddleware);
app.use(errorHandler);

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
