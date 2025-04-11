import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
