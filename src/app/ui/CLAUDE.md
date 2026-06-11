# CLAUDE.md — 프론트엔드 (UI 컴포넌트)

루트 `/CLAUDE.md`의 규칙을 따르며, 여기서는 `src/app/ui` 프레젠테이션 레이어 전용 규칙만 다룬다.

## 이 디렉토리의 역할

- 페이지(`app/(with-layout)`, `app/(no-layout)`)에서 쓰는 **프레젠테이션 컴포넌트**. 라우트 파일과 분리
- 도메인별로 폴더 구분: `main`(리포트 생성 폼), `reports-list`, `report-view`, `onboarding`, `auth`, `layout`, `common`(공용 UI)
- 데이터 페칭/비즈니스 로직은 여기서 하지 않는다 → `hooks/`(커스텀 훅), `stores/`(Zustand 전역 상태), `lib/api`를 통해 주입받는다

## UI 라이브러리 규칙

- **shadcn/ui** (`new-york` 스타일, RSC). 공용 프리미티브는 `@/app/ui/common`에 위치 → 새 공용 컴포넌트는 여기에 추가
- 아이콘은 **lucide-react**만 사용
- 클래스 병합은 `cn()` (`@/lib/utils`, clsx + tailwind-merge). 조건부 클래스 직접 문자열 연결 금지
- 스타일은 Tailwind v4 + `globals.css`의 CSS 변수. `class-variance-authority`로 variant 정의(`button`, `badge` 참고)

## 컨벤션

- 파일명은 kebab-case 우선(`report-form.tsx`). 기존 PascalCase 파일(`Modal.tsx`, `MonacoAutoHeight.tsx`)이 혼재하나 신규는 kebab-case로
- 리포트 생성 진행률 UI는 `common/loading/*`(job-loading/progress/completed/error-card) — `JOB_PHASES` 폴링 상태에 매핑됨. phase 추가 시 여기 동기화
- 리포트 뷰 시각화: Monaco(`report-view/monaco-file`, diff 데코는 `lib/util/monaco*`), Mermaid(`report-view/mermaid.tsx`)
- 무거운 클라이언트 의존(Monaco/Mermaid)은 동적 import로 분리해 초기 번들 보호
