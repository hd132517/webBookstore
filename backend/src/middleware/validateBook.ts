import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "./errorHandler";

const validateBook = [
  body("title").isString().trim().notEmpty().withMessage("책 제목은 필수입니다."),
  body("author").isString().trim().notEmpty().withMessage("저자는 필수입니다."),
  body("description").isString().trim().optional(),
  body("quantity").isInt({ min: 0 }).withMessage("수량은 0 이상의 숫자여야 합니다."),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ApiError(400, "입력값이 올바르지 않습니다."));
    }
    next();
  },
];

export { validateBook };
