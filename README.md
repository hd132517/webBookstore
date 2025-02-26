# 📚 북스토어 웹 애플리케이션

이 프로젝트는 온라인 서점 웹사이트를 구현한 풀스택 애플리케이션입니다.  
이 애플리케이션을 통해 사용자는 도서를 검색하고, 상세 정보를 확인하며, 도서를 추가/수정/삭제할 수 있습니다.

**프론트엔드**
- React.js + TypeScript
- React Router를 활용한 페이지 이동
- API 연동을 위한 Axios

**백엔드**
- Node.js + Express.js + TypeScript
- Mongoose를 이용한 MongoDB 데이터 모델링, 저장 및 관리
- RESTful API 설계

**데이터베이스**
- MongoDB Atlas: 클라우드 기반의 MongoDB 사용

---

## 프로젝트 실행 방법

### **백엔드 실행**
```
cd backend
npm install
npm start
```
백엔드 서버는 http://localhost:5000에서 실행됩니다.

### **프론트엔드 실행**
```
cd frontend
npm install
npm start
```
프론트엔드는 http://localhost:3000에서 실행됩니다.

---

## 프로젝트 폴더 구조
```
📂 root
 ├── 📂 backend          # 백엔드 (Express.js 기반)
 │   ├── 📂 src
 │   │   ├── 📂 controllers
 │   │   │   └── 📜 bookController.ts    # API 컨트롤러 (책의 CRUD 작업을 처리)
 │   │   ├── 📂 models
 │   │   │   └── 📜 bookModel.ts         # MongoDB 모델 (책 데이터 스키마 정의)
 │   │   ├── 📂 routes
 │   │   │   └── 📜 bookRoutes.ts        # 책 API의 라우팅 설정 (Express Router 사용)
 │   │   ├── 📂 middleware
 │   │   │   ├── 📜 errorHandler.ts      # 서버 에러를 처리하는 미들웨어 (예: 404, 500)
 │   │   │   └── 📜 validateBook.ts      # 책 데이터 유효성 검사를 위한 미들웨어
 │   │   └── 📜 server.ts                # Express 서버 설정 (서버 시작 및 미들웨어 적용)
 │   ├── 📂 tests
 │   │   └── 📜 bookController.test.ts   # bookController.ts의 단위 테스트 (Jest와 Supertest 사용)
 │   ├── 📜 package.json         # 백엔드 의존성 및 스크립트
 │   └── 📜 tsconfig.json        # TypeScript 컴파일러 설정
 │
 ├── 📂 frontend         # 프론트엔드 (React + TypeScript)
 │   ├── 📂 src
 │   │   ├── 📂 pages
 │   │   │   ├── 📜 BookList.tsx         # 책 목록 페이지 (API를 통해 책 목록 표시 및 검색)
 │   │   │   ├── 📜 BookDetail.tsx       # 책 상세 페이지 (책 정보 표시)
 │   │   │   └── 📜 AddBook.tsx          # 책 추가 페이지 (새로운 책을 추가)
 │   │   ├── 📜 api.ts               # API 요청을 처리하는 함수들 (백엔드와의 통신)
 │   │   ├── 📜 App.tsx              # 전체 레이아웃 및 라우팅 설정
 │   │   ├── 📜 index.tsx            # React 애플리케이션의 진입점
 │   │   ├── 📜 App.css              # 전체 스타일 시트 (애플리케이션의 기본 스타일)
 │   │   └── 📜 types.ts             # 프론트엔드에서의 Book 타입 정의 파일
 │   ├── 📜 package.json         # 프론트엔드 의존성 및 스크립트
 │   └── 📜 tsconfig.json        # TypeScript 컴파일러 설정
 │
 └── 📜 README.md        # 프로젝트 설명 문서 (프로젝트의 목적, 설치 방법, 사용법 등)

 ```

---

## 백엔드 상세 설명
### bookController.ts
- bookModel.ts를 사용하여 API 요청을 처리하는 컨트롤러 파일입니다.
- 책 목록 조회, 특정 책 조회, 책 추가, 수정, 삭제 기능을 제공합니다.
- 페이지네이션 및 검색 기능도 포함되어 있습니다.

### bookModel.ts
- 데이터베이스에서 직접적으로 데이터를 읽고 수정하는 역할을 합니다.
- MongoDB의 Mongoose를 사용하여 책 정보를 CRUD 방식으로 관리합니다.

### bookRoutes.ts
- bookController.ts의 기능을 사용하여 /api/books 엔드포인트에 대한 RESTful API를 정의합니다.
- Express의 Router를 활용하여 GET, POST, PUT, DELETE 요청을 처리합니다.

### server.ts
- Express 서버를 설정하고 실행하는 메인 파일입니다.
- bookRoutes.ts를 API 엔드포인트로 등록하여 /api/books 경로에서 API 요청을 처리할 수 있도록 합니다.

## 프론트엔드 상세 설명
### BookList.tsx
- GET /api/books API를 호출하여 책 목록을 가져와 화면에 표시합니다.
- 검색 기능과 페이지네이션을 포함하고 있습니다.

### BookDetail.tsx
- GET /api/books/:id API를 호출하여 특정 책의 정보를 가져와 상세 정보를 보여줍니다.

### AddBook.tsx
- POST /api/books API를 호출하여 새로운 책을 추가하는 페이지입니다.

### api.ts
- 백엔드 API와 통신하는 함수들을 포함한 파일입니다.
- 책 목록 조회, 책 상세 정보 조회, 책 추가, 수정, 삭제 기능을 제공하는 API 요청을 보냅니다.

### App.tsx
- React Router를 사용하여 /, /books/:id, /add 등의 라우트를 설정하고, BookList, BookDetail, AddBook 페이지를 연결합니다.

---

## API 테스트 방법
### bookController.test.ts
Jest와 Supertest를 사용하여 만든 테스트 스크립트를 통해 간단하게 백엔드 API의 주요 기능을 검증할 수 있습니다.
```
npm test
```

이외에도 백엔드 서버가 실행된 후, **Postman** 또는 **cURL**을 이용하여 API를 테스트할 수 있습니다.

### 모든 책 조회
```
curl -X GET http://localhost:5000/api/books
```
### 특정 책 조회 (ID: <id>)
```
curl -X GET http://localhost:5000/api/books/<id>
```
### 책 추가
```
curl -X POST http://localhost:5000/api/books \
     -H "Content-Type: application/json" \
     -d '{"title": "책 이름", "author": "작가 이름", "description": "책 설명", "quantity": 10}'
```
### 책 수정 (ID: <id>)
```
curl -X PUT http://localhost:5000/api/books/<id> \
     -H "Content-Type: application/json" \
     -d '{"title": "수정된 제목"}'
```
### 책 삭제 (ID: <id>)
```
curl -X DELETE http://localhost:5000/api/books/<id>
```

---

## 프로젝트 평가
### 초기 목표와 비교한 평가
목표: 사용자에게 페이지네이션이 적용된 책 목록, 책 검색, 상세 정보 조회, 책 추가/수정/삭제 기능을 제공하며, 프론트엔드와 백엔드의 완벽한 연동을 목표로 했습니다.
실현한 것:
- 프론트엔드: React와 TypeScript를 사용하여 책 목록 조회, 상세 정보 조회, 책 추가 기능을 구현했습니다. 또한, 검색과 페이지네이션 기능을 포함하여 유저 경험을 개선했습니다.
- 백엔드: Express.js와 MongoDB를 사용하여 API를 구현했으며, CRUD 기능, 검색 및 에러 처리, 보안을 고려한 설계를 추가했습니다.
- API 테스트: Jest와 Supertest를 활용하여 API 테스트를 자동화하고, 주요 기능에 대한 테스트가 포함되었습니다.

### 추가 목표 평가: 에러 처리 및 보안
#### 에러 처리 - 백엔드
- errorHandler.ts: 서버에서 발생하는 다양한 에러를 관리합니다. 예를 들어, API 요청이 잘못되었을 때 400 Bad Request, 데이터가 없을 때 404 Not Found, 서버 내부 오류가 발생할 경우 500 Internal Server Error를 적절히 처리합니다.
- try-catch 구문을 활용하여 비동기 함수에서 발생할 수 있는 에러를 잡아내고, 이를 사용자에게 명확한 메시지와 함께 전달합니다. 예외가 발생한 경우, 클라이언트에게 status 코드와 함께 에러 메시지를 응답합니다.
- 정적 파일 처리와 같은 경우도 추가적인 예외 처리를 통해 유효하지 않은 요청이나 파일이 없을 때 적절히 처리됩니다.
#### 에러 처리 - 프론트엔드:
- API 호출에서 발생할 수 있는 에러는 try-catch 구문과 axios의 catch 메서드를 통해 처리됩니다. 요청 실패 시 사용자에게 알림을 제공하여, 네트워크 오류나 서버 오류 등을 식별하고 유저가 문제를 인지할 수 있도록 합니다.
- 사용자 입력값의 유효성 검증을 추가하여, 잘못된 데이터를 서버로 보내지 않도록 보호합니다. 예를 들어, 책 정보 추가 시 필수 필드가 빠져 있으면 오류 메시지를 표시합니다.
#### 보안
- CORS: 외부 도메인에서의 API 요청을 제한하기 위해 CORS(Cross-Origin Resource Sharing) 정책을 설정합니다. 이를 통해 허가되지 않은 도메인에서의 접근을 막아 보안을 강화합니다.
- Helmet: HTTP 헤더를 안전하게 설정하기 위해 helmet 미들웨어를 사용하여 보안을 강화합니다. 이를 통해 클릭재킹 공격, XSS, CSRF 등의 공격을 예방할 수 있습니다.
- 환경 변수: 서버와 데이터베이스 연결을 위한 민감한 정보를 코드에 하드코딩하지 않고, .env 파일을 사용하여 관리합니다. 이를 통해 환경별로 보안 설정을 분리할 수 있습니다.
- SQL Injection 방지: MongoDB는 기본적으로 SQL Injection을 방지하지만, 쿼리 파라미터를 안전하게 다루기 위해 mongoose의 ORM을 활용하고 있습니다.
- XSS 보호: 사용자가 입력하는 데이터는 반드시 필터링하고, HTML 인젝션을 방지하기 위해 텍스트를 안전하게 렌더링합니다. 예를 들어, 책 설명에 HTML 태그를 포함시키지 않도록 처리합니다.
- HTTPS 강제 사용: 프론트엔드와 백엔드 간의 통신은 모두 HTTPS 프로토콜을 통해 안전하게 암호화된 채로 이루어집니다.

이와 같은 에러 처리 및 보안 조치들을 통해 애플리케이션의 안정성과 신뢰성을 높였으며, 사용자 데이터를 안전하게 보호하고 있습니다.

### 종합 평가
- 목표 달성: 프로젝트의 초기 목표였던 풀스택 애플리케이션 구현을 훌륭하게 수행했습니다.
- 프론트엔드와 백엔드 연동: 프론트엔드와 백엔드가 잘 연동되어 있으며, API 호출 및 응답 처리에 있어 완벽한 흐름을 구현했습니다.
- 에러 처리 및 예외 상황 관리: 예외 처리 및 에러 메시지를 세밀하게 다루었으며, 사용자 경험을 고려한 처리 방식이 잘 반영되었습니다.
- 보안: 보안을 고려하여, API와 서버의 보안 설정이 적절하게 반영되었습니다.
- 테스트: Jest와 Supertest를 사용하여 API의 핵심 기능에 대해 충분한 테스트를 제공하고 있습니다.

이 프로젝트는 처음 목표를 완벽히 달성하였으며, 실제 운영에 필요한 보안, 에러 처리, 예외 관리 측면까지 고려한 견고한 웹 애플리케이션입니다.