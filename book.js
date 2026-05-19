class Book {
  constructor(id, title, author, yearPublished, genre) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.genre = genre;
  }
}

const books = [
  new Book(1, 'The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy'),
  new Book(2, '1984', 'George Orwell', 1949, 'Dystopian'),
  new Book(3, 'To Kill a Mockingbird', 'Harper Lee', 1960, 'Classic'),
];

function getAllBooks() {
  return books;
}

function getBookById(id) {
  return books.find((book) => book.id === id) || null;
}

function addBook(bookData) {
  const nextId = books.length ? Math.max(...books.map((book) => book.id)) + 1 : 1;
  const newBook = new Book(nextId, bookData.title, bookData.author, bookData.yearPublished, bookData.genre);
  books.push(newBook);
  return newBook;
}

module.exports = {
  Book,
  books,
  getAllBooks,
  getBookById,
  addBook,
};
