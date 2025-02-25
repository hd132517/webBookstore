import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB 연결
const mongoURI = process.env.MONGO_URI || "mongodb+srv://user:p7qC6O26zFUuhuoc@webbookstorecluster.j4wyf.mongodb.net/?retryWrites=true&w=majority&appName=webBookstoreCluster"; // MongoDB URI

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
const allowedOrigins = ["http://localhost:3000"]; // 필요 시 도메인 추가
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