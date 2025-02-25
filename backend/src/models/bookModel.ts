import mongoose, { Document, Schema } from "mongoose";

// Book 인터페이스 정의
export interface Book extends Document {
  title: string;
  author: string;
  description: string;
  quantity: number;
}

// Book 스키마 정의
const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// Book 모델 정의
const BookModel = mongoose.model('Book', bookSchema);

// BookModel 내보내기
export { BookModel };

// 책 목록 가져오기
export const getAllBooks = async (): Promise<Book[]> => {
  try {
    return await BookModel.find(); // MongoDB에서 모든 책을 가져옵니다.
  } catch (error) {
    console.error("Error loading books:", error);
    return [];
  }
};

// 특정 책 가져오기
export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    return await BookModel.findById(id); // MongoDB에서 ID로 책을 찾습니다.
  } catch (error) {
    console.error("Error getting book by ID:", error);
    return null;
  }
};

// 책 추가
export const addBook = async (newBook: Omit<Book, "id">): Promise<Book> => {
  try {
    const book = new BookModel(newBook); // 새로운 책을 MongoDB에 저장
    await book.save(); // MongoDB에 저장
    return book;
  } catch (error) {
    console.error("Error adding book:", error);
    throw new Error("Error adding book");
  }
};

// 책 수정
export const updateBook = async (id: string, updatedData: Partial<Omit<Book, "id">>): Promise<Book | null> => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(id, updatedData, { new: true }); // MongoDB에서 책 수정
    return updatedBook;
  } catch (error) {
    console.error("Error updating book:", error);
    return null;
  }
};

// 책 삭제
export const deleteBook = async (id: string): Promise<boolean> => {
  try {
    const result = await BookModel.findByIdAndDelete(id); // MongoDB에서 책 삭제
    return result !== null; // 삭제된 책이 있으면 true 반환
  } catch (error) {
    console.error("Error deleting book:", error);
    return false;
  }
};
