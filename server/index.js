import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import User from "./routes/user.js";

dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());

app.use("/users", User);

app.listen(5000, () => {
  console.log("listening on Port " + process.env.PORT);
});
