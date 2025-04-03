import express from "express";

// Importerar NeDB, en lättanvänd lokal JSON-databas
import Datastore from "nedb";

// Skapar en ny express-applikation
const app = express();

// Middleware för att kunna ta emot JSON-data i request-kroppen (req.body)
app.use(express.json());

// Skapar en ny NeDB-databas med filnamnet "books.db" och laddar in den automatiskt
// Filen books.db skapas automatiskt när du kör applikationen första gången
const db = new Datastore({ filename: "books.db", autoload: true });

/* ------- CREATE (POST): Lägg till en bok ------ */
// Definierar en POST-route på URL:en "/books" för att lägga till nya böcker
app.post("/books", (req, res) => {
  // db.insert sparar den inkommande datan från requestens body i databasen
  db.insert(req.body, (err, newDoc) => {
    // Hanterar eventuella fel vid sparandet i databasen
    if (err) {
      return res.status(500).json({ error: "Något gick fel!" });
    }

    // Om allt gick bra skickas det nya dokumentet tillbaka till klienten
    res.json(newDoc);
  });
});

/* ----- READ (GET): Hämta alla böcker ------ */
// Definierar en GET-route på URL:en "/books" för att hämta alla sparade böcker
app.get("/books", (req, res) => {
  // db.find hämtar alla dokument från databasen (tomt objekt {} anger "hämta allt")
  db.find({}, (err, docs) => {
    // Hanterar eventuella fel vid hämtningen från databasen
    if (err) {
      return res.status(500).json({ error: "Något gick fel!" });
    }

    // Skickar alla dokument tillbaka till klienten
    res.json(docs);
  });
});

/* ----- Startar servern ------ */
// Appen startar nu upp och lyssnar efter requests på port 8080
app.listen(8080, () => {
  console.log("Server running on port http://localhost:8080");
});
