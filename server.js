import express from "express";
import Datastore from "nedb";

// Skapa express server
const app = express();

// Middleware för att kunna ta emot JSON-data i req-bodyn
app.use(express.json());

// skapa nedb databas
const db = new Datastore({ filename: "books.db", autoload: true });

// POST anrop till nedb databasen lägg till bok till databasen
app.post("/books", (req, res) => {
  db.insert(req.body, (err, newDoc) => {
    if (err) {
      return res.status(500).json({ error: "något gick fel" });
    }

    res.json(newDoc);
  });
});

// GET anrop till nedb databasen. hämta alla böcker från databasen
app.get("/books", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      return res.status(500).json({ error: "något gick fel, med get anropet" });
    }

    res.json(docs);
  });
});

// Starta servern
app.listen(8080, () => {
  console.log("servern körs på http://localhost:8080");
});

// Testa med Postman
