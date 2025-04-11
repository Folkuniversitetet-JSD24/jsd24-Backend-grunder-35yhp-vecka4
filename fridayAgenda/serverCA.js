// 1. Importera bibliotek
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import bookRoutesCA from "./routesCA/bookRoutesCA.js";

dotenv.config();

const app = express();
app.use(express.json()); // Gör att vi kan läsa JSON i POST/PUT

// Koppla upp till MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Ansluten till MongoDB"))
  .catch((err) => console.error("❌ Fel vid anslutning:", err));

mongoose.connection.once("open", () => {
  console.log("📦 Ansluten till DB:", mongoose.connection.name);
});

// 🗣️
// "Först försöker vi koppla upp oss till MongoDB med .connect(). Om det lyckas skriver vi ut en bekräftelse i konsolen.
// Men för att vara riktigt säkra på att anslutningen är helt öppen, lyssnar vi också på mongoose.connection.once('open').
// Där kan vi logga vilken databas vi är anslutna till – vilket är extra användbart om man jobbar i olika miljöer, t.ex. test eller produktion."

app.use("/booksCA", bookRoutesCA);

//  Starta servern
app.listen(8080, () => {
  console.log("📡 Server igång på http://localhost:8080");
});

// 🗣️ Talarmanus:
("I vår server kopplar vi bara ihop allt: vi ansluter till databasen, använder JSON och säger att /booksCA ska hanteras av vår router.");
