import express from "express";
import Datastore from "nedb";

// Skapa express server
const app = express();

// Middleware för att kunna ta emot JSON-data i req-bodyn
app.use(express.json());

// skapa nedb databas
const db = new Datastore({ filename: "books.db", autoload: true });
// const db = new Datastore({ filename: "databas/books.db", autoload: true });

// CREATE/POST anrop till nedb databasen lägg till bok till databasen
app.post("/books", (req, res) => {
  db.insert(req.body, (err, newDoc) => {
    if (err) {
      return res.status(500).json({ error: "något gick fel" });
    }

    res.json(newDoc);
  });
});

// READ/GET anrop till nedb databasen. hämta alla böcker från databasen
app.get("/books", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      return res.status(500).json({ error: "något gick fel, med get anropet" });
    }

    res.json(docs);
  });
});

// READ/GET för att hämta en specifik bok baserat på id
app.get("/books/:id", (req, res) => {
  db.findOne({ _id: req.params.id }, (err, doc) => {
    if (err)
      return res.status(500).json({ error: "Fel vid hämtning av boken." });

    if (!doc)
      return res.status(404).json({ error: "Boken finns inte i databasen." });

    res.status(200).json(doc);
  });
});

// UPDATE/(PUT) för att uppdatera en specifik bok baserat på id
app.put("/books/:id", (req, res) => {
  db.update(
    { _id: req.params.id },
    { $set: req.body },
    {},
    (err, numUpdated) => {
      if (err)
        return res.status(500).json({ error: "Fel vid uppdatering av boken." });

      if (numUpdated === 0) {
        return res
          .status(404)
          .json({ error: "Ingen bok hittades med det angivna ID:t." });
      }

      res
        .status(200)
        .json({ message: "Boken uppdaterad", updatedCount: numUpdated });
    }
  );
});

// REMOVE/(DELETE) för att ta bort en specifik bok baserat på id
app.delete("/books/:id", (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Kunde inte ta bort boken från databasen." });

    if (numRemoved === 0) {
      return res
        .status(404)
        .json({ error: "Ingen bok hittades med det angivna ID:t." });
    }

    res
      .status(200)
      .json({ message: "Boken borttagen.", removedCount: numRemoved });
  });
});

// Hantera alla andra (icke-matchande) routes
app.use((req, res) => {
  res.status(404).json({
    error: "Sidan kunde inte hittas.",
    path: req.originalUrl,
  });
});

// Starta servern
app.listen(8080, () => {
  console.log("servern körs på http://localhost:8080");
});

// Testa med Postman
