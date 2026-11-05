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
| 친구 찾기 탭 | `app/(tabs)/find.tsx` | FD01 269:2190 | 임시 화면 |
| ME01 내 공간 | `app/(tabs)/me.tsx` | 269:2888 | 코드 완료 |
| ME02–ME10 설정 (프로필 수정·언어·편지·알림·차단 목록·AI 안내·플러스·해지·계정) | `app/settings/*` | 269:2960–3219 | 코드 완료 |
| SF01–SF03 신고·차단·탈퇴 | `app/safety/*` | 269:2518 / 2549 / 2570 | 코드 완료 |
| ES01 빈 상태 6종, ES02 로딩, SY01 알림 권한, SY02 오프라인 | `app/states/*` (`[kind]`, `loading`, `offline`, `notify`) | 269:2726–2873, 277:3512, 269:1637, 269:2593 | 코드 완료 |
| ON01–ON10 가입 + 링크 만료 | `app/onboarding/*` | 269:1801–3371, 277:3469, 277:3493 | 코드 완료 (로그인·서버 연결 전) |
| 친구 찾기(FD01/FD02), 배움 상세(LR02–LR04), 관계(RL01–03), 우편함 보조(MB02–07), 편지(LT00/03/04), 우표(ST01–03), AI02, 영어 UI, 상태 변형(269:713 섹션) | — | 269:* | 미구현 |

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
