import express, { Request, Response } from "express";
import { getBooks, getBook, createBook, modifyBook, removeBook } from "../controllers/bookController";

const router = express.Router();

// 모든 책 조회
router.get("/", (req: Request, res: Response): void => {
  getBooks(req, res);
});

// 특정 책 조회
router.get("/:id", (req: Request<{ id: string }>, res: Response): void => {
  getBook(req, res);
});

// 책 추가
router.post("/", (req: Request, res: Response): void => {
  createBook(req, res);
});

// 책 정보 수정
router.put("/:id", (req: Request<{ id: string }>, res: Response): void => {
  modifyBook(req, res);
});

// 책 삭제
router.delete("/:id", (req: Request<{ id: string }>, res: Response): void => {
  removeBook(req, res);
});

export default router;
