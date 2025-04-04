import express from "express";
import Datastore from "nedb";

const app = express();
app.use(express.json());

const db = new Datastore({ filename: "books.db", autoload: true });

// CREATE (POST): Lägg till ny bok
app.post("/books", (req, res) => {
  // Sparar nytt dokument i databasen med data från request body
  db.insert(req.body, (err, newDoc) => {
    if (err)
      return res.status(500).json({ error: "Kunde inte lägga till bok." });

    // newDoc innehåller nu den bok vi precis sparade inklusive ett unikt _id
    res.json(newDoc);
  });
});

// READ (GET): Hämta alla böcker
app.get("/books", (req, res) => {
  // Hämtar samtliga dokument från databasen
  db.find({}, (err, docs) => {
    if (err) return res.status(500).json({ error: "Kunde inte hämta böcker." });

    // docs är en array med alla böcker i databasen
    res.json(docs);
  });
});

// READ (GET): Hämta en bok med specifikt ID
app.get("/books/:id", (req, res) => {
  // Hämtar EN bok med det specifika _id som skickas med i URLen
  db.findOne({ _id: req.params.id }, (err, doc) => {
    if (err)
      return res.status(500).json({ error: "Fel vid hämtning av boken." });

    if (!doc) return res.status(404).json({ error: "Boken finns inte." });

    // doc är det specifika dokumentet (boken)
    res.json(doc);
  });
});

// UPDATE (PUT): Uppdatera en bok
app.put("/books/:id", (req, res) => {
  // Uppdaterar dokumentet med specifikt _id, med nya värden från request body
  db.update(
    { _id: req.params.id },
    { $set: req.body },
    {},
    (err, numUpdated) => {
      if (err)
        return res.status(500).json({ error: "Kunde inte uppdatera bok." });

      // numUpdated visar hur många dokument som ändrats (0 eller 1 i detta fall)
      res.json({ message: "Bok uppdaterad!", updatedCount: numUpdated });
    }
  );
});

// DELETE (DELETE): Ta bort en bok
app.delete("/books/:id", (req, res) => {
  // Tar bort dokument med det angivna _id
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) return res.status(500).json({ error: "Kunde inte ta bort bok." });

    // numRemoved visar antal borttagna dokument (vanligtvis 1)
    res.json({ message: "Bok borttagen!", removedCount: numRemoved });
  });
});

app.listen(8080, () => {
  console.log("Server running on port http://localhost:8080");
});
