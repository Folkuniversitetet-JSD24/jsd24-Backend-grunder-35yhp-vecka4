import express from "express";
const app = express();
app.use(express.json());

app.post("/books", (req, res) => {
  res.json({ message: "Det funkade!", body: req.body });
});

app.listen(8080, () => {
  console.log("Kör på http://localhost:8080");
});
