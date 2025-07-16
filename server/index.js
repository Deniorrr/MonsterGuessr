import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { serialize, deserialize } from "bson";
import http from "http";
import sql from "mssql";

const config = {
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  options: {
    encrypt: true,
    trustServerCertificate: false,
    authentication: {
      type: "azure-active-directory-password",
    },
  },
};

import express from "express";
import cors from "cors";
import multer from "multer";
import validator from "validator";
import rateLimit from "express-rate-limit";

const QUESTION_AMOUNT = 5; // Number of questions to fetch

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://mhguessr.com",
// ];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  // if (origin && !allowedOrigins.includes(origin)) {
  //   return res.status(403).send("Forbidden: Origin not allowed");
  // }
  // if (origin && allowedOrigins.includes(origin)) {
  //   res.setHeader("Access-Control-Allow-Origin", origin);
  //   res.setHeader("Access-Control-Allow-Credentials", "true");
  //   res.setHeader("Vary", "Origin");
  //   res.setHeader(
  //     "Access-Control-Allow-Methods",
  //     "GET,POST,PUT,DELETE,OPTIONS"
  //   );
  //   res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  // }
  // cors is handeled by hosting
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

const server = http.createServer(app);

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// GET random screenshots
app.get("/screens", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        `SELECT TOP (${QUESTION_AMOUNT}) idscreenshots, screenData, gameName, mapName, layer, lat, lng, easyMode FROM screenshots ORDER BY NEWID()`
      );
    if (result.recordset.length > 0) {
      const screens = result.recordset.map((row) => {
        const imageData = deserialize(row.screenData).imageData;
        return {
          ...row,
          imageData,
        };
      });
      res.json(screens);
    } else {
      res.status(404).send("No screenshots found");
    }
  } catch (err) {
    console.log("Error fetching random screenshots:", err);
    res.status(500).send("Error fetching random screenshots");
  }
});

// GET random screenshots (easy mode)
app.get("/screenseasymode", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .query(
        `SELECT TOP (${QUESTION_AMOUNT}) idscreenshots, screenData, gameName, mapName, layer, lat, lng, easyMode FROM screenshots WHERE easyMode = 1 ORDER BY NEWID()`
      );
    if (result.recordset.length > 0) {
      const screens = result.recordset.map((row) => {
        const imageData = deserialize(row.screenData).imageData;
        return {
          ...row,
          imageData,
        };
      });
      res.json(screens);
    } else {
      res.status(404).send("No screenshots found");
    }
  } catch (err) {
    console.log("Error fetching random screenshots:", err);
    res.status(500).send("Error fetching random screenshots");
  }
});

// POST submit new screenshot
app.post("/submit", authLimiter, upload.single("file"), async (req, res) => {
  let { region, layer, lat, lng, easyMode, localKey, passwd } = req.body;
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

  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("screenData", sql.VarBinary(sql.MAX), screenData)
      .input("gameName", sql.NVarChar(50), "MHW")
      .input("mapName", sql.NVarChar(50), region)
      .input("layer", sql.NVarChar(50), layer)
      .input("lat", sql.Float, lat)
      .input("lng", sql.Float, lng)
      .input("easyMode", sql.Bit, easyMode)
      .input("user", sql.NVarChar(50), localKey.slice(0, 3))
      .query(
        `INSERT INTO screenshots (screenData, gameName, mapName, layer, lat, lng, easyMode, [user])
         VALUES (@screenData, @gameName, @mapName, @layer, @lat, @lng, @easyMode, @user)`
      );
    res.send("Screen submitted");
  } catch (err) {
    console.error("Error inserting screenshot:", err);
    res.status(500).send("Error inserting screenshot");
  }
});

const port = process.env.PORT || 3001;

server.listen(port);
console.log("app Started on localhost:" + port);
