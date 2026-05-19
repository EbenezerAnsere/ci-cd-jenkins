const express = require('express');
const { getAllBooks, getBookById, addBook } = require('./book');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const APP_NAME = 'Library';

function renderHomePage(books) {
  const bookRows = books
    .map(
      (book) =>
        `<tr><td>${book.id}</td><td>${book.title}</td><td>${book.author}</td><td>${book.yearPublished}</td><td>${book.genre}</td></tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${APP_NAME}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f7f9fc; color: #333; }
    header { background: #1a73e8; color: white; padding: 20px; text-align: center; }
    main { padding: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { padding: 10px; border: 1px solid #ddd; }
    th { background: #eef3fb; }
    form { margin-top: 20px; display: grid; gap: 10px; max-width: 500px; }
    input, button { padding: 10px; border: 1px solid #ccc; border-radius: 4px; }
    button { background: #1a73e8; color: white; border: none; cursor: pointer; }
    button:hover { background: #155ab6; }
  </style>
</head>
<body>
  <header>
    <h1>${APP_NAME}</h1>
    <p>Small library app with basic book data and a tiny API.</p>
  </header>
  <main>
    <section>
      <h2>Book collection</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Title</th><th>Author</th><th>Year</th><th>Genre</th></tr>
        </thead>
        <tbody>
          ${bookRows}
        </tbody>
      </table>
    </section>
    <section>
      <h2>Add a book</h2>
      <form id="bookForm">
        <input name="title" placeholder="Title" required />
        <input name="author" placeholder="Author" required />
        <input name="yearPublished" placeholder="Year Published" type="number" required />
        <input name="genre" placeholder="Genre" required />
        <button type="submit">Add Book</button>
      </form>
      <p id="message" style="color: green;"></p>
    </section>
  </main>
  <script>
    const form = document.getElementById('bookForm');
    const message = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = {
        title: formData.get('title'),
        author: formData.get('author'),
        yearPublished: Number(formData.get('yearPublished')),
        genre: formData.get('genre'),
      };

      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        message.textContent = 'Book added successfully. Refresh the page to see it.';
        form.reset();
      } else {
        message.textContent = 'Unable to add book. Try again.';
      }
    });
  </script>
</body>
</html>`;
}

app.get('/', (req, res) => {
  res.send(renderHomePage(getAllBooks()));
});

app.get('/api/books', (req, res) => {
  res.json(getAllBooks());
});

app.get('/api/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = getBookById(id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author, yearPublished, genre } = req.body;
  if (!title || !author || !yearPublished || !genre) {
    return res.status(400).json({ error: 'Missing book fields' });
  }

  const newBook = addBook({ title, author, yearPublished: Number(yearPublished), genre });
  res.status(201).json(newBook);
});

const PORT = 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`${APP_NAME} app listening on port ${PORT}`);
  });
}

module.exports = app;