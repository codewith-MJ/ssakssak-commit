# ========================
# 1. Build Stage
# ========================
FROM node:18-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 빌드용 환경변수 전달
ARG REDIS_URL
ENV REDIS_URL=$REDIS_URL

# 패키지 복사 및 설치
COPY package*.json ./
RUN npm install

# 앱 소스 복사
COPY . .

# Prisma client 생성
RUN npx prisma generate

# Next.js 빌드
RUN npm run build

# ========================
# 2. Runner Stage
# ========================
FROM node:18-alpine AS runner

WORKDIR /app

# 빌드된 앱 복사
COPY --from=builder /app ./

# 포트 오픈
EXPOSE 3000

# 앱 실행
CMD ["npm", "run", "start"]
