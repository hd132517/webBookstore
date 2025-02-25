import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/books";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get(`${API_URL}?page=${page}&search=${search}`)
      .then(response => setBooks(response.data))
      .catch(error => console.error(error));
  }, [page, search]);

  return (
    <div>
      <h1>Book List</h1>
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Link to="/add">Add New Book</Link>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.title} - {book.author}</Link>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const handleDelete = () => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        alert("Book deleted successfully");
        navigate("/");
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Stock: {book.stock}</p>
      <button onClick={handleDelete}>Delete Book</button>
      <Link to={`/edit/${id}`}>Edit Book</Link>
      <Link to="/">Back to list</Link>
    </div>
  );
};

const AddEditBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState({ title: "", author: "", stock: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`)
        .then(response => setBook(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id ? axios.put(`${API_URL}/${id}`, book) : axios.post(API_URL, book);
    request.then(() => navigate("/"))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>{id ? "Edit" : "Add"} Book</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={book.title} onChange={(e) => setBook({...book, title: e.target.value})} required />
        <input type="text" placeholder="Author" value={book.author} onChange={(e) => setBook({...book, author: e.target.value})} required />
        <input type="number" placeholder="Stock" value={book.stock} onChange={(e) => setBook({...book, stock: e.target.value})} required />
        <button type="submit">{id ? "Update" : "Add"} Book</button>
      </form>
      <Link to="/">Back to list</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/add" element={<AddEditBook />} />
        <Route path="/edit/:id" element={<AddEditBook />} />
      </Routes>
    </Router>
  );
};

export default App;
