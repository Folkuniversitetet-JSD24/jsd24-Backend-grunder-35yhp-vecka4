import BookCA from "../modelsCA/bookModelCA";

// GET alla böcker
export const getBooksCA = async (req, res) => {
  const books = await BookCA.find();
  res.json(books);
};

// GET bok med ID
export const getBookByIdCA = async (req, res) => {
  const book = await BookCA.findById(req.params.id);
  book ? res.json(book) : res.status(404).json({ error: "Hittades ej" });
};

// POST ny bok
export const createBookCA = async (req, res) => {
  try {
    const newBook = new BookCA(req.body);
    const saved = await newBook.save();
    res.json(saved);
  } catch {
    res.status(500).json({ error: "Fel vid skapande" });
  }
};

// PUT uppdatera bok
export const updateBookCA = async (req, res) => {
  const updated = await BookCA.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  updated ? res.json(updated) : res.status(404).json({ error: "Hittades ej" });
};

// DELETE radera bok
export const deleteBookCA = async (req, res) => {
  const deleted = await BookCA.findByIdAndDelete(req.params.id);
  deleted
    ? res.json({ message: "Boken raderad" })
    : res.status(404).json({ error: "Hittades ej" });
};

// 🗣️ Talarmanus:
("Controllers innehåller logiken. Här håller vi all kod för att läsa, skapa, uppdatera och ta bort böcker – och exporterar dessa funktioner till routern.");
