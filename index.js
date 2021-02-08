import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postsRoute from "./routes/posts.js";
import { connectionDB } from "./db/connectionDB.js";

const app = express();
dotenv.config();
connectionDB()
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

//route declare
app.use("/posts", postsRoute);

const PORT = process.env.PORT || 5000;
// mongoose
//   .connect(process.env.DB_URL_LOCAL, {
//     // .connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
  // .then(() => app.listen(PORT, () => console.log(`server running at ${PORT}`)))
  // .catch((err) => console.log(err.message));
  app.listen(PORT, () => {
    console.log(`Server in created and listening on port ${PORT}`);
  });
  