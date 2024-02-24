import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

//important when you send data from the front end
app.use(express.json());
//important too
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

//to connect to database
mongoose.connect(
  "mongodb+srv://ninjashoyo:SjKaw9ICtuIQES3K@recipes.gduc5tv.mongodb.net/recipes?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED"));
