import Book from "../models/bookModel.js";

// GET för att hämta alla böcker

export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
};

// GET för att hämta en specifik bok
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  // if (book) {
  //     res.status(200).json(book)

  // } else {
  //     res.status(200).json(book)
  // }

  book
    ? res.status(200).json(book)
    : res.status(404).json({ error: "Boken hittades inte" });
};

// POST för att lägga till en ny bok till databasen
export const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Fel vid skapandet av boken", err });
  }
};

// PUT för att uppdatera en specifik bok
export const updateBook = async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  updated
    ? res.json(updated)
    : res.status(404).json({ error: "Boken hittades inte" });
};

// DELETE för att ta bort/radera en specifik bok
export const deletedBook = async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);

  deleted
    ? res.json({ message: "Boken raderades" })
    : res.status(404).json({ error: "Boken hittades inte" });
};

// exportera alla funktioner så att vi kan använda dom i vår router för books
