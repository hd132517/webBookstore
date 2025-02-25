import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBooks } from "../api";
import { Book } from "../types";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 책 목록을 불러오는 함수
  useEffect(() => {
    const fetchData = async () => {
      const { books, totalPages } = await fetchBooks(query, page);
      setBooks(books);
      setTotalPages(totalPages);
    };

    fetchData();
  }, [query, page]); // 검색어(query)나 페이지(page)가 변경될 때마다 호출

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);  // 검색어 상태 업데이트
    setPage(1);  // 검색어가 변경되면 첫 페이지로 리셋
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <h1>책 목록</h1>
      <input
        type="text"
        placeholder="제목 또는 저자 검색"
        value={query}
        onChange={handleSearchChange}
      />
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/books/${book._id}`}>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          이전
        </button>
        <span>페이지 {page} / {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default BookList;
