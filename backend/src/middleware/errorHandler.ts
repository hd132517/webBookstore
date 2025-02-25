import { Request, Response, NextFunction } from "express";

// 커스텀 에러 클래스 정의
class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

// 글로벌 에러 핸들러
const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
  });
};

export { ApiError, errorHandler };
