import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./Utils/swaggerDocument.js"; // Ensure correct path
import dotenv from "dotenv";
const app = express();
import connectDB from "./DbConfig/DbConfig.js"

dotenv.config();

//port
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
import passport from "passport";

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

//routes

//connect to data
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(
    `API documentation available at http://localhost:${port}/api-docs`
  );
});
