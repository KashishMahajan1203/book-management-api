const router = require("express").Router();
const books = require("./books_dumb");

let booksDirectory = books;

router.get("/books", function (req, res) {
  res.send(booksDirectory);
});

router.get("/books/:id", function (req, res) {
  const { id } = req.params;

  const book = booksDirectory.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("Book does not exist");

  res.send(book);
});

router.post("/books", function (req, res) {
  const {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  } = req.body;

  const bookExist = booksDirectory.find((b) => b.isbn === isbn);
  if (bookExist) return res.send("Book already exists");

  const book = {
    title,
    isbn,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  };
  booksDirectory.push(book);

  res.send(book);
});

router.put("/books/:id", function (req, res) {
  const { id } = req.params;
  const {
    title,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
    categories,
  } = req.body;

  const book = booksDirectory.find((b) => b.isbn === id);
  if (!book) return res.send("Book does not exist");

  const updatedField = (val, prev) => (!val ? prev : val);

  const updatedBook = {
    ...book,
    title: updatedField(title, book.title),
    pageCount: updatedField(pageCount, book.pageCount),
    publishedDate: updatedField(publishedDate, book.publishedDate),
    thumbnailUrl: updatedField(thumbnailUrl, book.thumbnailUrl),
    shortDescription: updatedField(shortDescription, book.shortDescription),
    longDescription: updatedField(longDescription, book.longDescription),
    status: updatedField(status, book.status),
    authors: updatedField(authors, book.authors),
    categories: updatedField(categories, book.categories),
  };

  const bookIndex = booksDirectory.findIndex((b) => b.isbn === id);
  booksDirectory.splice(bookIndex, 1, updatedBook);

  res.send(updatedBook);
});

router.delete("/books/:id", function (req, res) {
  const { id } = req.params;

  let book = booksDirectory.find((b) => b.isbn === id);
  if (!book) return res.status(404).send("book does not exist");

  booksDirectory = booksDirectory.filter((b) => b.isbn !== id);

  res.send("Success");
});

module.exports = router;
