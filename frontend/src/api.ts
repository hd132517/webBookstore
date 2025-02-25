import { Book } from "./types";

const API_URL = "http://localhost:5000/api/books";

// 책 목록 조회 (검색 및 페이지네이션 추가)
export const fetchBooks = async (query: string = "", page: number = 1): Promise<{ books: Book[], totalPages: number }> => {
  const response = await fetch(`${API_URL}?q=${query}&_page=${page}&_limit=10`);

  // 응답 본문을 JSON으로 파싱
  const data = await response.json();

  return { books: data.books, totalPages: data.totalPages };
};

// 책 상세 정보 조회
export const fetchBookById = async (_id: string): Promise<Book> => {  // `id: number` -> `id: string`로 수정
  const response = await fetch(`${API_URL}/${_id}`);
  return response.json();
};

// 책 추가
export const addBook = async (book: Omit<Book, "_id">): Promise<void> => {  // `Omit<Book, "id">`으로 책 정보만 받아옴
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
};

// 책 정보 수정
export const updateBook = async (_id: string, updatedData: Omit<Book, "_id">): Promise<void> => {  // `id: number` -> `id: string`로 수정
  await fetch(`${API_URL}/${_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
};

// 책 삭제
export const deleteBook = async (_id: string): Promise<void> => {  // `id: number` -> `id: string`로 수정
  await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
};
