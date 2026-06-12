# CLAUDE.md — 백엔드 (API 라우트)

루트 `/CLAUDE.md`의 규칙을 따르며, 여기서는 `src/app/api` 라우트 핸들러 전용 규칙만 다룬다.

## 라우트 핸들러의 책임 (얇게 유지)

- 입력 파싱/검증, 인증, 응답 직렬화, status 매핑**만** 한다
- 비즈니스 로직은 `services/*`, DB 접근은 `repositories/*`, 외부 연동은 `infra/*`로 위임. 라우트에 로직 작성 금지
- 긴 작업(AI 분석 등)은 직접 처리하지 말고 `infra/messaging/queue`로 enqueue → `202` + `jobId` 반환

## 표준 에러 처리 패턴 (모든 핸들러 동일)

```ts
try {
  // ...
} catch (error) {
  const message =
    error instanceof Error ? error.message : SYSTEM_ERROR_MESSAGES.UNEXPECTED;
  const status = error instanceof AppError ? error.status : 500;
  return NextResponse.json({ error: { message, status } }, { status });
}
```

- 도메인 에러는 `src/errors`의 `AppError` 서브클래스(`NotFoundError`, `UnauthorizedError` 등)를 throw → status가 자동 매핑됨
- 사용자 노출 메시지는 `constants/error-messages.ts` 상수만 사용 (하드코딩 금지)

## 컨벤션

- **Next 15**: 동적 세그먼트 `params`는 `Promise` → 반드시 `await params`
- 입력 검증은 `lib/validators/*`(zod) 사용. raw body/searchParams 직접 신뢰 금지
- 인증: `requireUserId()`(미인증 시 `UnauthorizedError`), GitHub 토큰은 `getAccessToken()`
- `reportId` 분기: 프리픽스(`REPORT_ID_PREFIX` GUEST/SHARE)면 Redis 캐시 조회, 아니면 `requireUserId()` + DB 조회
- 폴링/실시간 응답(`report-jobs/[jobId]`)은 `Cache-Control: no-store` 헤더 필수
- job 상태/단계 문자열은 `constants/report-job.ts`(`JOB_STATUS`, `JOB_PHASES`)만 참조
