import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById, updateBook, deleteBook } from "../api";
import { Book } from "../types";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // id는 string으로 처리
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const bookData = await fetchBookById(id); // id를 string으로 그대로 사용
        setBook(bookData);
      };

      fetchData();
    } else {
      console.error("Invalid ID: id is undefined");
    }
  }, [id]);

  if (!book) return <p>로딩 중...</p>;

  const handleQuantityChange = (newQuantity: number) => {
    if (book && id) {
      updateBook(id, { ...book, quantity: newQuantity }); // id는 string 그대로 사용
      setBook((prevBook) => (prevBook ? { ...prevBook, quantity: newQuantity } : null));
    }
  };

  const handleDelete = async () => {
    if (id) {
      await deleteBook(id); // id는 string 그대로 사용
      navigate("/");  // 삭제 후 홈으로 이동
    }
  };

  return (
    <div>
      <h1>{book.title}</h1>
      <p>저자: {book.author}</p>
      <p>설명: {book.description}</p>
      <p>수량: {book.quantity}</p>
      <button onClick={() => handleQuantityChange(book.quantity + 1)}>수량 증가</button>
      <button onClick={() => handleQuantityChange(book.quantity - 1)}>수량 감소</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default BookDetail;
