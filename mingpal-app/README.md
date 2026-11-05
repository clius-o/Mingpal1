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
| FD01 친구 찾기 탭 / FD02 조건 | `app/(tabs)/find.tsx`, `app/find/filters.tsx` | 269:2190 / 2251 | 코드 완료 |
| LR02 오늘의 복습(앞/뒤) · LR03 표현장 · LR04 표현 상세 | `app/learn/review.tsx`, `phrases.tsx`, `phrase/[id].tsx` | 269:2297 / 2317 / 2337 / 2404 | 코드 완료 |
| RL01 잠시 쉬기 · RL02 편지 마치기 · RL03 종료된 기록 | `app/relation/*` | 269:2433 / 2464 / 2491 | 코드 완료 |
| MB02 첫 편지 · MB03 초안 · MB04 보관 | `app/mailbox/*` | 269:1979 / 2011 / 2037 | 코드 완료 |
| MB06 일상 메모 시트 · AI02 영어로는? 시트 | `app/memo.tsx`, `app/translate.tsx` | 269:2061 / 1670 | 코드 완료 |
| MB07 밍팔 우체국 편지 · LT00 봉투 연출 · LT03 보내기 전 확인 · LT04 보낸 뒤 완료 | `app/letter/post.tsx`, `opening.tsx`, `confirm.tsx`, `sent.tsx` | 269:1743 / 1657 / 1552 / 1600 | 코드 완료 |
| ST01 우표 그림 · ST02 기념 소인 | `app/stamps/index.tsx`, `postmarks.tsx` | 269:2642 / 2686 | 코드 완료 |
| ME01–ME10 내 공간·설정 | `app/(tabs)/me.tsx`, `app/settings/*` | 269:2888–3219 | 코드 완료 |
| SF01–SF03 신고·차단·탈퇴 | `app/safety/*` | 269:2518 / 2549 / 2570 | 코드 완료 |
| ES01 빈 상태 6종, ES02 로딩, SY01 알림 권한, SY02 오프라인 | `app/states/*` | 269:2726–2873, 277:3512, 269:1637, 269:2593 | 코드 완료 |
| ON01–ON10 가입 + 링크 만료 | `app/onboarding/*` | 269:1801–3371, 277:3469, 277:3493 | 코드 완료 (로그인·서버 연결 전) |
| 상태 변형(269:713 섹션: LT01 변형 4종·MB05 더보기·LT02 최소 길이·AI01 첫 편지·MB05 한 달째 조용함·LT03 전송 실패/결과 불명·LT01 신고한 편지·LT04 첫 교류), 영어 UI(279:3751) | — | 269:717–1069, 277:3555–3713, 279:3752–3902 | 미구현 |

> "코드 완료"는 타입체크(`npx tsc --noEmit`)와 더미 에셋을 채운 웹 번들(`expo export`)·레이아웃 스크린샷 확인까지만 했습니다. 실제 Figma 에셋을 받은 뒤의 화면 비교와 기기 실행은 아직입니다.

## 실행 전에 필요한 것

1. **Figma 에셋 받기** — `scripts/fetch-figma-assets.sh` (www.figma.com 접근 필요, URL은 2026-11-05 발급·7일 유효).
   이 파일이 없으면 번들링이 실패합니다(`src/assets.ts`가 `assets/figma/*`를 require).
2. `npm install` → `npx expo start`
3. 가입 흐름은 `/onboarding`, 빈·시스템 상태는 `/states/inbox` 등으로 직접 열어 볼 수 있습니다(로그인·라우팅 연결 전).

## 알려 둔 사항

- 데이터는 `src/data/mock.ts`의 샘플입니다. 서버(Supabase)·로그인·AI는 아직 없습니다.
- 용지 질감 배경은 Figma에서 단색(#f2eee9)이 위를 덮어 보이지 않아 단색으로 처리했습니다.
- `ios.bundleIdentifier` / `android.package`(`com.clius.mingpal`)는 임시값입니다. 앱 아이콘·스플래시도 템플릿 기본 이미지입니다.
- MaruBuri(8MB)는 앱 용량을 줄이려면 서브셋이 필요하고, 글꼴 라이선스 고지(ME10)가 출시 전에 필요합니다(MINGPAL_V3_1 §14.1).
- 새로 쓴 화면의 에셋(chevron, 아바타 12종·지윤·Lukas·Daniel, 빈 상태 일러스트 6종, 플러스·알림·메일 일러스트)도 `scripts/fetch-figma-assets.sh`에 URL을 추가했습니다. 같은 7일 유효 URL입니다.
- Figma의 목록 행 글꼴은 MaruBuri Regular인데 번들된 글꼴은 Bold뿐이라 설정·신고 화면의 행 글자가 Figma보다 굵게 보입니다. Regular 글꼴을 추가하면 `maru16`/`maru18` 외에 Regular 스타일을 `theme.ts`에 추가해 교체하세요.
- ON07의 Figma 문구 "안전 검사를 위해 안전 검사를 위해 …"는 오타로 보고 한 번만 썼습니다. ME08 가격 "[가격 미정]"과 ME10 이메일은 Figma 자리표시를 그대로 두거나 목 데이터를 썼습니다.
- SF01 신고 사유는 Figma에서 두 번째("밍팔 밖으로 연락 유도")가 선택된 모양이라 기본 선택으로 두었습니다. 실제 기본값은 기획 확인이 필요합니다.
- 신고·차단·탈퇴·가입·알림 권한은 화면과 이동만 있고 서버·권한·로그인 동작은 없습니다. MB05 더보기 메뉴(269:883)와 LT01 신고 진입점은 아직 연결하지 않았습니다.
- 편지 흐름: 우편함 도착 카드 → LT00 봉투 → LT01 읽기(→ 영어로는? AI02 시트) / 쓰기 LT02 → LT03 확인 → LT04 완료 → AI03 첨삭. 쓰기 화면의 "보내기 전 확인"은 이전에 AI03으로 바로 가던 것을 LT03으로 바로잡았습니다.
- LR03 표현장의 "전체 n / 써 본 표현 n" 숫자는 Figma의 32·9 대신 목 데이터 개수로 계산합니다. LR02 복습 덱도 카드 1장짜리 목 데이터입니다.
- 첫 편지 보내기·초안·보관·일상 메모·우표 선택은 화면 상태만 있고 저장되지 않습니다(서버 연결 전).
