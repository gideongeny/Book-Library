import React from 'react';
import BookItem from './BookItem';

const BookList = ({ books, onEdit, onDelete }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={() => onEdit(book.id)}
          onDelete={() => onDelete(book.id)}
        />
      ))}
    </div>
  );
};

export default BookList;
