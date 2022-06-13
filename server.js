import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import authControl from "./middleware/auth.js"
import cors from "cors"

const app = express();
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);

dotenv.config();

app.get("/", (req, res) => {
  res.send("hello world😊😊😊😊😊");
});

app.use(express.json());


app.use("/user",userRoutes);
app.use("/task",authControl,taskRoutes)
const PORT =process.env.PORT ||9000;
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("DB is connected");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is connected on port  ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
