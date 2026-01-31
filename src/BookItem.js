import React from 'react';

const BookItem = ({ book, onEdit, onDelete }) => {
  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default BookItem;
