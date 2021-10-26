import session from "express-session";
import express from "express";
import cors from "cors";

import MongoStore from "connect-mongo";

import { __prod__ } from "../constants";

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    name: "cookieId",
    resave: false,
    saveUninitialized: false,
    secret: "aaabbbccc",
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 30 * 24 * 60 * 60, // = 30 days
      touchAfter: 24 * 3600, // time period in seconds
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      httpOnly: true,
      sameSite: "lax",
      secure: __prod__, //cookie only works in https
    },
  })
);

module.exports = app;
