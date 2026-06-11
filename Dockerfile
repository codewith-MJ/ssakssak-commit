# ========================
# 1. Build Stage (이미지 = 붕어빵 틀을 굽는 단계)
# ========================
FROM node:22-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 먼저 복사 후 설치 (lockfile 기준 재현 설치)
# npm ci: package-lock.json에 고정된 버전 그대로 설치 → 로컬/서버 환경 일치 보장
COPY package*.json ./
RUN npm ci

# 앱 소스 복사
COPY . .

# Prisma client 생성 (schema.prisma 기준 타입/쿼리 코드 생성)
RUN npx prisma generate

# next build가 /api/reports 수집 시 큐 모듈을 import → 모듈 최상단에서 redis 연결을
# 즉시 생성하므로 REDIS_URL이 없으면 throw한다. 빌드 통과용 placeholder(실제 연결 X).
# 진짜 REDIS_URL은 런타임에 compose가 주입하므로 이 값은 최종 동작에 영향 없음.
# TODO(후속): 큐/redis 연결을 지연 초기화로 바꾸면 이 placeholder 제거 가능.
ENV REDIS_URL=redis://localhost:6379

# Next.js 운영 빌드 (next build)
RUN npm run build

# ========================
# 2. Runner Stage (구운 틀로 실제 컨테이너를 실행하는 단계)
# ========================
FROM node:22-alpine AS runner

WORKDIR /app

# 운영 모드 명시
ENV NODE_ENV=production

# 빌드 산출물 + node_modules 통째로 복사
# (worker는 이 이미지의 tsx + src를 그대로 재사용해 실행됨)
COPY --from=builder /app ./

# 포트 오픈 (web 서비스용)
EXPOSE 3000

# 기본 실행 명령 = web. worker 서비스는 compose에서 command로 덮어씀
CMD ["npm", "run", "start"]
