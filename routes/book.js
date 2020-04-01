const router = require("express").Router();
const Book = require("../models/Book");

// create a book
router.post("/", async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author
    });
    const newBook = await book.save();
    res.status(201).send(newBook);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// get one book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById({ _id: req.params.id });
    res.status(200).send(book);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// update a book
router.patch("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          author: req.body.author
        }
      }
    );
    res.status(201).send(updatedBook);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

// delele a booK
router.delete("/:id", async (req, res) => {
  try {
    const removedBook = await Book.remove({ _id: req.params.id });
    res.status(200).send(removedBook);
  } catch (err) {
    res.status(400).send({ message: err });
  }
});

module.exports = router;
