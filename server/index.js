import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { serialize, deserialize } from "bson";
import mysql from "mysql2";
import http from "http";

import express from "express";
import cors from "cors";
import multer from "multer";
import validator from "validator";

import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many requests, please try again later.",
});
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://mhguessr.com", // Replace with your actual domain
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Only allow requests with an allowed Origin or no Origin (e.g., curl, server-to-server)
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).send("Forbidden: Origin not allowed");
  }

  // Set CORS headers for allowed origins
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  }

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const server = http.createServer(app);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

app.get("/screens", async (req, res) => {
  const sql = `SELECT * FROM screenshots ORDER BY RAND() LIMIT 3`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error fetching random screenshots:", err);
      res.status(500).send("Error fetching random screenshots");
      return;
    }
    if (results.length > 0) {
      const screens = results.map((result) => {
        const screenData = result.screenData;
        const imageData = deserialize(screenData).imageData;
        return {
          ...result,
          imageData,
        };
      });
      res.json(screens);
    } else {
      res.status(404).send("No screenshots found");
    }
  });
});

app.get("/screenseasymode", async (req, res) => {
  const sql = `SELECT * FROM screenshots WHERE easyMode = true ORDER BY RAND() LIMIT 3`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log("Error fetching random screenshots:", err);
      res.status(500).send("Error fetching random screenshots");
      return;
    }
    if (results.length > 0) {
      const screens = results.map((result) => {
        const screenData = result.screenData;
        const imageData = deserialize(screenData).imageData;
        return {
          ...result,
          imageData,
        };
      });
      res.json(screens);
    } else {
      res.status(404).send("No screenshots found");
    }
  });
});

app.post("/submit", authLimiter, upload.single("file"), async (req, res) => {
  // authLimiter added to limit requests and prevent brute force attacks
  let { region, layer, lat, lng, easyMode, localKey, passwd } = req.body;
  //XSS just in case
  region = validator.escape(region || "");
  layer = validator.escape(layer || "");
  lat = validator.toFloat(lat + "") || 0;
  lng = validator.toFloat(lng + "") || 0;
  easyMode = easyMode === "true" ? 1 : 0;
  localKey = validator.escape(localKey || "");

  if (
    (localKey !== process.env.ADMIN1 && localKey !== process.env.ADMIN2) ||
    passwd !== process.env.PASSWD
  ) {
    return res.status(403).send("Forbidden: Invalid credentials");
  }
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const screenData = serialize({ imageData: file.buffer });
  pushScreen(
    screenData,
    "MHW",
    region,
    layer,
    lat,
    lng,
    easyMode,
    localKey.slice(0, 3)
  );
  res.send("Screen submitted");
});

server.listen(3001);
console.log("app Started on localhost:3001");

const pushScreen = (
  screenData,
  gameName,
  mapName,
  layer,
  lat,
  lng,
  easyMode,
  localKey
) => {
  easyMode = easyMode === "true" ? 1 : 0;
  const sql = `INSERT INTO screenshots (screenData, gameName, mapName, layer, lat, lng, easyMode, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [screenData, gameName, mapName, layer, lat, lng, easyMode, localKey],
    (err, result) => {
      if (err) {
        console.error("Error inserting screenshot:", err);
        return;
      }
      console.log(result);
    }
  );
};
