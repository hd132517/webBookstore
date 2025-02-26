import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI || ''; // MongoDB URI
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'

if (mongoose.connection.readyState === 0) {
    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log("MongoDB connected successfully.");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // 연결 실패 시 서버 종료
      });
}

// CORS 설정 강화
const allowedOrigins = [CLIENT_URL]; // 필요 시 도메인 추가
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// 보안 헤더 추가
app.use(helmet());

// JSON 파싱 미들웨어 추가
app.use(express.json());

// 책 관련 API 라우팅
app.use("/api/books", bookRoutes);

// 에러 핸들러 적용
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app; // 테스트용 export