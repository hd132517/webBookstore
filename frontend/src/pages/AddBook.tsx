import React, { useState } from "react";
import { addBook } from "../api";
import { useNavigate } from "react-router-dom";

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && author && quantity >= 0) {
      await addBook({ title, author, description, quantity });
      navigate("/"); // 책 추가 후 홈으로 이동
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
    }
  };

  return (
    <div>
      <h1>책 추가</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>저자:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>설명:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>수량:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="0"
            required
          />
        </div>
        <button type="submit">책 추가</button>
      </form>
    </div>
  );
};

export default AddBook;
