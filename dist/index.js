import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router.js";
dotenv.config();
var app = express();
app.use(cors(), express.json(), router);
var PORT = process.env.PORT;
app.listen(PORT);
