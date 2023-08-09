import React, { useState } from 'react';
import './App.css';
import './App.scss'
import { Book } from './Employee.type';

function App() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
  ]);

  const [formData, setFormData] = useState<Book>({ id: 0, title: '', author: '' });

  const handleInputChange = (fieldName: keyof Book, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const addBook = () => {
    if (!formData.title || !formData.author) return;

    const newBook: Book = { ...formData, id: Date.now() };
    setBooks([...books, newBook]);
    setFormData({ id: 0, title: '', author: '' });
  };

  const updateBook = (id: number) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, ...formData } : book
    );
    setBooks(updatedBooks);
    setFormData({ id: 0, title: '', author: '' });
  };

  const deleteBook = (id: number) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  return (
    <div className="App">
      <h1>Book CRUD Application</h1>
      <div className='form-container'>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => handleInputChange('author', e.target.value)}
        />
        {formData.id === 0 ? (
          <button onClick={addBook}>Add Book</button>
        ) : (
          <button onClick={() => updateBook(formData.id)}>Update Book</button>
        )}
      </div>
      <ul className='book-list'>
        {books.map((book) => (
          <li key={book.id}>
            <span>{book.title}</span> by <span>{book.author}</span>
            <button onClick={() => setFormData(book)}>Edit</button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
