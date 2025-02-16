import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import fs from "fs";
import path from "path";
import { serialize, deserialize } from "bson";
import { fileURLToPath } from "url";
import mysql from "mysql2";
import http from "http";

import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = http.createServer(app);

console.log(process.env.DB_HOST);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

app.post("/submit", upload.single("file"), async (req, res) => {
  const { region, layer, lat, lng, easyMode } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const screenData = serialize({ imageData: file.buffer });

  pushScreen(screenData, "MHW", region, layer, lat, lng, easyMode);
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
  easyMode
) => {
  easyMode = easyMode === "true" ? 1 : 0;
  const sql = `INSERT INTO screenshots (screenData, gameName, mapName, layer, lat, lng, easyMode) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [screenData, gameName, mapName, layer, lat, lng, easyMode],
    (err, result) => {
      if (err) {
        console.log("EROOR!?!?!", err);
      }
      console.log(result);
    }
  );
};

//to służyło do wrzucania screenów do bazy danych
// import screenshotsData from "./data/screenshots/screenshotsData.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// screenshotsData.forEach((screenshot) => {
//   const screenName = screenshot.screenName;
//   const gameName = screenshot.gameName;
//   const mapName = screenshot.mapName;
//   const layer = screenshot.layer;
//   const lat = screenshot.location.lat;
//   const lng = screenshot.location.lng;
//   const imagePath = path.join(__dirname, "data", "screenshots", screenName);
//   fs.readFile(imagePath, (err, imageData) => {
//     if (err) {
//       console.log("Error reading image file:", err);
//       return;
//     }

//     const bsonData = serialize({ imageData });
//     pushScreen(bsonData, gameName, mapName, layer, lat, lng);
//   });
// });

// app.post("/login", async (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

// });

// app.get("/conversations", async (req, res) => {
//   DbAccess.getConversations(req.user.id)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });
