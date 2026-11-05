# 밍팔 (Mingpal)

다른 나라 친구와 천천히 편지를 주고받으며 언어를 배우는 앱. React Native (Expo SDK 58) + expo-router, TypeScript.
기획·디자인 원본: `clius-o/Mingpal1`(MINGPAL_V3_1.md), Figma 파일 `hh7ZlihbABvtoYeUifdKpG` (03 핵심 8화면 v3.1).

## 구현 상태

| 화면 | 라우트 | Figma | 상태 |
|---|---|---|---|
| MB01 우편함 | `app/(tabs)/index.tsx` | 284:5683 | 코드 완료 |
| LR01 배움 홈 | `app/(tabs)/learn.tsx` | 284:6167 | 코드 완료 |
| MB05 친구별 기록 | `app/friend/[id].tsx` | 284:5897 | 코드 완료 |
| FD03 친구 소개 | `app/profile/[id].tsx` | 284:5957 | 코드 완료 |
| LT01 편지 읽기 | `app/letter/[id].tsx` | 284:5833 | 코드 완료 (클립 이미지 미배치) |
| LT02 편지 쓰기 | `app/write/[id].tsx` | 284:6014 | 코드 완료 |
| AI01 AI 도움 시트 | `app/help.tsx` | 284:6053 | 코드 완료 |
| AI03 나만 보는 첨삭 | `app/review.tsx` | 284:6125 | 코드 완료 |
| 친구 찾기 / 내 공간 탭 | `app/(tabs)/find.tsx`, `me.tsx` | FD01 / ME01 | 임시 화면 |
| 가입, 상태·빈 화면, 안전, 설정 등 나머지 ~80화면 | — | 269:* | 미구현 |

## 실행 전에 필요한 것

1. **Figma 에셋 받기** — `scripts/fetch-figma-assets.sh` (www.figma.com 접근 필요, URL은 2026-11-05 발급·7일 유효).
   이 파일이 없으면 번들링이 실패합니다(`src/assets.ts`가 `assets/figma/*`를 require).
2. `npm install` → `npx expo start`

## 알려 둔 사항

- 데이터는 `src/data/mock.ts`의 샘플입니다. 서버(Supabase)·로그인·AI는 아직 없습니다.
- 용지 질감 배경은 Figma에서 단색(#f2eee9)이 위를 덮어 보이지 않아 단색으로 처리했습니다.
- `ios.bundleIdentifier` / `android.package`(`com.clius.mingpal`)는 임시값입니다. 앱 아이콘·스플래시도 템플릿 기본 이미지입니다.
- MaruBuri(8MB)는 앱 용량을 줄이려면 서브셋이 필요하고, 글꼴 라이선스 고지(ME10)가 출시 전에 필요합니다(MINGPAL_V3_1 §14.1).
