import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import AddBook from "./pages/AddBook";
import "./App.css";

const App: React.FC = () => (
  <Router>
    <nav className="navbar">
      <h1 className="logo">📚 Bookstore</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/add" className="nav-link">Add Book</Link>
      </div>
    </nav>
    <div className="container">
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </div>
  </Router>
);

export default App;
