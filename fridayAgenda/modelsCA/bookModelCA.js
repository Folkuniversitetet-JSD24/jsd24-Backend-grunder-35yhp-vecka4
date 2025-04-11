import mongoose from "mongoose";

// 3. Skapa ett schema
const bookSchemaCA = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
});

// 4. Skapa en modell baserat på schemat
const BookCA = mongoose.model("BookCA", bookSchemaCA);

export default BookCA;

// 🗣️ Talarmanus:
("Vi börjar med modellen – här beskriver vi hur ett dokument i databasen ser ut. Det är detta schema mongoose använder för att strukturera datan.");
