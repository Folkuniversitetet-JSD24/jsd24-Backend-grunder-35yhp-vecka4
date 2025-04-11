import express from "express";
import {
  getBooksCA,
  getBookByIdCA,
  createBookCA,
  updateBookCA,
  deleteBookCA,
} from "../controllersCA/bookControllerCA.js";

const router = express.Router();

router.get("/", getBooksCA);
router.get("/:id", getBookByIdCA);
router.post("/", createBookCA);
router.put("/:id", updateBookCA);
router.delete("/:id", deleteBookCA);

export default router;

// 🗣️ Talarmanus:
("Här kopplar vi varje route till rätt controllerfunktion. Det gör att vi enkelt kan byta ut eller uppdatera logik utan att röra våra routes.");
