# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 절대 규칙

- `.env`, 시크릿 파일 커밋 금지. `main`/`develop` 브랜치 직접 push 금지 → PR로만 머지
- DB 스키마 변경은 `prisma/schema.prisma` 수정 후 `prisma db push`로 반영 (이 repo는 migrations 파일을 두지 않음). 운영 DB 직접 쿼리 금지
- 에러는 `src/errors`의 커스텀 `AppError` 계열로 명시적 throw (조용한 실패 금지). API 라우트의 status 매핑 패턴은 `src/app/api/CLAUDE.md` 참조
- 모든 답변은 한국어로

## 프로젝트 개요

싹싹커밋(Ssakssak Commit): GitHub 커밋 데이터를 OpenAI로 분석해 요약/분석 리포트를 생성하는 서비스. Next.js 15(App Router) 단일 리포지토리. UI와 API가 `src/app`에 통합.

## 명령어

```bash
npm run dev            # Next 개발 서버 (web)
npm run worker:start   # BullMQ 워커 프로세스 (별도 실행 필수 — 리포트 생성은 워커가 처리)
npm run build          # 프로덕션 빌드
npm run lint           # eslint .
npm run format         # prettier --write .
npm run check          # eslint + prettier --check (커밋 전 확인)
npx prisma db push     # schema.prisma → DB 반영 (migrations 파일 미사용)
npx prisma generate    # Prisma Client 재생성 (Dockerfile 빌드 단계에서도 실행)
docker-compose up      # web + worker + redis (운영은 docker-compose.prod.yml: web + worker + caddy)
```

- 테스트 프레임워크 없음. lint-staged + husky가 커밋 시 `eslint --max-warnings=0` + `prettier --check` 실행
- import 경로 별칭: `@/*` → `src/*`
- 필수 환경변수: `DATABASE_URL`(Postgres), `REDIS_URL`, `GITHUB_CLIENT_ID/SECRET`, `NEXTAUTH_SECRET/URL`, `OPENAI_API_KEY/MODEL`

## 아키텍처

### 레이어 경계 (위에서 아래로만 의존)

- `app/api/*/route.ts` — HTTP 파싱 + 인증 + status 매핑만. 비즈니스 로직 금지
- `services/*` — 비즈니스 로직 오케스트레이션 (리포트 생성, 커밋 분석, rate-limit)
- `repositories/*` — Prisma 기반 DB 접근 (`report.ts`, `user.ts`)
- `infra/*` — 외부 경계: `cache`(Redis), `messaging`(BullMQ 큐/워커), `integrations`(github/openai), `github-api`
- `lib/*` — 인증, 로거(pino), 파서, validator(zod) 등 공용
- `constants/*` — 모든 매직값/enum은 여기서 `as const`로 정의 (큐 이름, job phase, 토큰 한도 등)

### 핵심 흐름: 비동기 리포트 생성 (Queue–Worker)

긴 AI 분석이 web 서버를 블로킹하지 않도록 **요청과 처리를 분리**. web과 워커는 별도 프로세스.

1. `POST /api/reports` → 입력 검증 → `addReportCreationJob`으로 BullMQ에 enqueue → `202` + `jobId` 반환 (즉시 응답)
2. **`reportCreation` 워커**(`infra/messaging/worker/report-creation.ts`)가 job 소비 → `services/reports/create-report.ts` 실행:
   - GitHub에서 커밋 목록/상세 수집 → 토큰 기준으로 배치 분할(`chunk-commits-by-tokens`)
   - 각 배치를 **`analysisBatch` 큐에 자식 job으로 분산**(`analyze-commit-batches-queued`) → OpenAI 분석
   - 배치 결과 병합·시간순 정렬·전체 요약 생성
   - 로그인 유저면 DB 저장(`saveReportToDatabase`), 비로그인이면 Redis 저장(`saveReportToRedis`)
3. 진행 상태는 `JOB_PHASES`(pending→collecting→analyzing→visualizing→completed)로 `job.updateProgress`에 기록
4. 클라이언트는 `GET /api/report-jobs/{jobId}`를 `POLLING_INTERVAL`(2초)로 **폴링**해 진행률 표시
5. 큐 옵션: `attempts: 3` + exponential backoff (reportCreation만 `attempts: 1`). 동시성은 `constants/worker-config.ts`

두 큐(`JOB_QUEUE`)와 job 이름(`JOB`), phase/status는 모두 `constants/report-job.ts`에 정의. 새 큐/단계 추가 시 여기부터 수정.

### 인증 (NextAuth + GitHub OAuth)

- `lib/auth/auth-options.ts` — GitHub provider, JWT 전략(scope: `repo read:user user:email read:org`), 콜백은 `lib/auth/callbacks/{sign-in,jwt,session}.ts`로 분리
- GitHub access token은 JWT에 저장, 만료 시 `helpers/refresh-access-token.ts`로 갱신
- 서버에서 인증 강제: `requireUserId()`(없으면 `UnauthorizedError`), token은 `getAccessToken()`
- 401 시 클라이언트는 `lib/handle-api-error.ts`가 `/auth/error`로, 리포트 뷰는 로그인 리다이렉트

### 라우트 그룹

- `app/(with-layout)` — 공통 레이아웃 페이지(홈, reports, report-view, loading)
- `app/(no-layout)` — 레이아웃 없는 페이지(login, error, access-denied, auth/error)
- `app/ui/*` — 페이지별 프레젠테이션 컴포넌트 (라우트와 분리)

### 배포

- `main` push → GitHub Actions(`.github/workflows/deploy.yml`)가 EC2에 SSH 접속해 `docker-compose.prod.yml` 재빌드·재기동 (즉시 운영 반영)
- 배포 동시 실행 방지(concurrency) 설정됨 — 서버 RAM 한계로 docker build 병렬 실행 불가

### 영역별 하위 가이드

- **UI 컴포넌트 작성** (shadcn, Zustand 상태, Monaco/Mermaid 시각화): `src/app/ui/CLAUDE.md`
- **API 라우트 작성** (에러 처리, 인증, params 규칙): `src/app/api/CLAUDE.md`

## 컨벤션

- 커밋 메시지: 이모지 + `<type>:<subject>` (예: `🔨fix:...`, `feat(auth):...`). 한국어 subject
- 파일명 kebab-case, named export 선호
- 도메인 데이터는 `types/`에 타입 정의 후 사용. validator는 zod(`lib/validators`)
