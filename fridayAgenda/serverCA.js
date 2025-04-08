// 1. Importera bibliotek
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(express.json()); // Gör att vi kan läsa JSON i POST/PUT

dotenv.config();

// 2. Koppla upp till MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Ansluten till MongoDB"))
  .catch((err) => console.error("❌ Fel vid anslutning:", err));

mongoose.connection.once("open", () => {
  console.log("📦 Ansluten till DB:", mongoose.connection.name);
});

// 3. Skapa ett schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
});

// 4. Skapa en modell baserat på schemat
const Book = mongoose.model("Book", bookSchema);

// 5. POST – Skapa en ny bok
app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "Något gick fel" });
  }
});

// 6. GET – Hämta alla böcker
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// 7. GET – Hämta bok med ID
app.get("/books/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  book ? res.json(book) : res.status(404).json({ error: "Hittades ej" });
});

// 8. PUT – Uppdatera bok med ID
app.put("/books/:id", async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  updated ? res.json(updated) : res.status(404).json({ error: "Hittades ej" });
});

// 9. DELETE – Ta bort bok med ID
app.delete("/books/:id", async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);
  deleted
    ? res.json({ message: "Boken är raderad" })
    : res.status(404).json({ error: "Hittades ej" });
});

// 10. Starta servern
app.listen(8080, () => {
  console.log("📡 Server igång på http://localhost:8080");
});
