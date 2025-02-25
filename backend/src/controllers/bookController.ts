import { Request, Response } from "express";
import mongoose from "mongoose";  // mongoose 모듈 임포트
import { getAllBooks, getBookById, addBook, updateBook, deleteBook, BookModel } from "../models/bookModel";
import validator from "validator";

// 책 목록 조회
export const getBooks = async (req: Request, res: Response) => {
  try {
    const { q = "", _page = "1", _limit = "10" } = req.query;

    // 입력값 검증
    if (!validator.isInt(_page.toString()) || !validator.isInt(_limit.toString())) {
      return res.status(400).json({ error: "Invalid pagination values" });
    }

    const page = Number(_page);
    const limit = Number(_limit);

    // 검색어 XSS 방어
    const sanitizedQuery = validator.escape(q.toString());

    const books = await getAllBooks();
    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(sanitizedQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(sanitizedQuery.toLowerCase())
    );

    const paginatedBooks = filteredBooks.slice((page - 1) * limit, page * limit);
    const totalPages = Math.ceil(filteredBooks.length / limit);

    res.json({ books: paginatedBooks, totalPages });
  } catch (error) {
    console.error(error);  // 에러 로그
    res.status(500).json({ error: "Internal Server Error: Unable to retrieve books" });
  }
};

// 책 상세 조회
export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // ID 검증: MongoDB ObjectId 검증
    if (!validator.isMongoId(id)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const book = await getBookById(id);  // id를 문자열로 그대로 전달
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error(error);  // 에러 로그
    res.status(500).json({ error: "Internal Server Error: Unable to fetch book" });
  }
};

// 책 추가
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description, quantity } = req.body;

    // 입력값 검증
    if (!title || !author || !description || quantity === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (
      !validator.isLength(title, { min: 1, max: 100 }) ||
      !validator.isLength(author, { min: 1, max: 50 }) ||
      !validator.isLength(description, { min: 1, max: 500 }) ||
      !validator.isInt(quantity.toString(), { min: 0 })
    ) {
      return res.status(400).json({ error: "Invalid input values" });
    }

    // XSS 방어
    const sanitizedTitle = validator.escape(title);
    const sanitizedAuthor = validator.escape(author);
    const sanitizedDescription = validator.escape(description);

    // Mongoose 모델을 사용하여 책 객체 생성
    const newBook = new BookModel({
      title: sanitizedTitle,
      author: sanitizedAuthor,
      description: sanitizedDescription,
      quantity,
    });

    // 책 저장
    const createdBook = await newBook.save();
    res.status(201).json(createdBook);
  } catch (error) {
    console.error(error);  // 에러 로그
    res.status(500).json({ error: "Internal Server Error: Unable to add book" });
  }
};

// 책 수정
export const modifyBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // ID 검증: MongoDB ObjectId 검증
    if (!validator.isMongoId(id)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    if (updatedData.title) updatedData.title = validator.escape(updatedData.title);
    if (updatedData.author) updatedData.author = validator.escape(updatedData.author);
    if (updatedData.description) updatedData.description = validator.escape(updatedData.description);

    const updatedBook = await updateBook(id, updatedData);  // id를 문자열로 그대로 전달
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error(error);  // 에러 로그
    res.status(500).json({ error: "Internal Server Error: Unable to update book" });
  }
};

// 책 삭제
export const removeBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // ID 검증: MongoDB ObjectId 검증
    if (!validator.isMongoId(id)) {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const success = await deleteBook(id);  // id를 문자열로 그대로 전달
    if (!success) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);  // 에러 로그
    res.status(500).json({ error: "Internal Server Error: Unable to delete book" });
  }
};
