import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/server';  // Express 앱 import
import { BookModel } from '../src/models/bookModel';

describe('Book API', () => {
  // 테스트 DB 연결을 한 번만 시도
  beforeAll(async () => {
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/testdb"; // 로컬 DB URL
    if (mongoose.connection.readyState === 0) {  // 이미 연결되어 있지 않은 경우에만 연결
      await mongoose.connect(mongoURI);
    }
    await BookModel.deleteMany({}); // 테스트 전에 모든 책 데이터를 지웁니다.
  });

  // 테스트 종료 후 연결을 끊어줍니다.
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should filter books by title and author', async () => {
    // 책 데이터 생성
    await BookModel.create({ title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', description: 'A novel about the American dream.', quantity: 4 });
    await BookModel.create({ title: '1984', author: 'George Orwell', description: 'A dystopian novel.', quantity: 5 });

    // 쿼리로 필터링
    const response = await request(app).get('/api/books').query({ q: '1984' });

    expect(response.status).toBe(200);
    expect(response.body.books.length).toBe(1);  // 필터링된 책 목록 길이
    expect(response.body.books[0].title).toBe('1984');
    expect(response.body.books[0].author).toBe('George Orwell');
  });

  it('should add a new book', async () => {
    const newBook = { title: 'Brave New World', author: 'Aldous Huxley', description: 'A novel about a dystopian society.', quantity: 10 };

    const response = await request(app).post('/api/books').send(newBook);

    expect(response.status).toBe(201);  // 책 추가 후 상태 코드 201
    const addedBook = await BookModel.findOne({ title: newBook.title });
    expect(addedBook).not.toBeNull();
    expect(addedBook?.title).toBe(newBook.title);
  });

  it('should return book details by ID', async () => {
    const book = await BookModel.create({ title: 'The Catcher in the Rye', author: 'J.D. Salinger', description: 'A novel about teenage rebellion.', quantity: 7 });

    const response = await request(app).get(`/api/books/${book._id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(book.title);
    expect(response.body.author).toBe(book.author);
  });

  it('should delete a book by ID', async () => {
    const book = await BookModel.create({ title: 'To Kill a Mockingbird', author: 'Harper Lee', description: 'A novel about racial injustice.', quantity: 3 });

    const response = await request(app).delete(`/api/books/${book._id}`);

    expect(response.status).toBe(204);  // 상태 코드 204
    const deletedBook = await BookModel.findById(book._id);
    expect(deletedBook).toBeNull();
  });
});
