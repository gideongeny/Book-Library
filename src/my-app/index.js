import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file

function App() {
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [editBookId, setEditBookId] = useState(null);
  const [editBookTitle, setEditBookTitle] = useState('');
  const [editBookAuthor, setEditBookAuthor] = useState('');

  // Load books from local storage on component mount
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Save books to local storage on changes in books state
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBookTitle || !newBookAuthor) return;

    const newBook = {
      id: Math.random().toString(36).substring(2, 7), // Generate unique ID
      title: newBookTitle,
      author: newBookAuthor,
    };

    setBooks([...books, newBook]);
    setNewBookTitle('');
    setNewBookAuthor('');
  };

  const handleEditBook = (bookId) => {
    const bookToEdit = books.find((book) => book.id === bookId);
    setEditBookId(bookId);
    setEditBookTitle(bookToEdit.title);
    setEditBookAuthor(bookToEdit.author);
  };

  const handleSaveEdit = () => {
    if (!editBookId || !editBookTitle || !editBookAuthor) return;

    const updatedBooks = books.map((book) =>
      book.id === editBookId
        ? { ...book, title: editBookTitle, author: editBookAuthor }
        : book
    );

    setBooks(updatedBooks);
    setEditBookId(null);
    setEditBookTitle('');
    setEditBookAuthor('');
  };

  const handleDeleteBook = (bookId) => {
    const filteredBooks = books.filter((book) => book.id !== bookId);
    setBooks(filteredBooks);
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>
      <form onSubmit={handleAddBook}>
        <label htmlFor="bookTitle">Book Title:</label>
        <input
          type="text"
          id="bookTitle"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
          required
        />
        <label htmlFor="bookAuthor">Author:</label>
        <input
          type="text"
          id="bookAuthor"
          value={newBookAuthor}
          onChange={(e) => setNewBookAuthor(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>

      {books.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  {editBookId === book.id ? (
                    <>
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={() => setEditBookId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditBook(book.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteBook(book.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

// Create a separate App.css file for styling
