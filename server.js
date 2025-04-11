import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// importera min book route
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

// Kopp upp till min MongoDB Atlas databas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Nu är jag ansluten till min MongoDB databas"))
  .catch((err) => console.error("Fel vid anslutning till datavbasen: ", err));

mongoose.connection.once("open", () => {
  console.log("Ansluten till DB", mongoose.connection.name);
});

// använda min book route
app.use("/books", bookRoutes);

// Starta servern
app.listen(8745, () => {
  console.log("servern körs på http://localhost:8745");
});
