// 상태·영어 UI 확인용 갤러리. 제품 흐름에서 직접 열리지 않는 변형 화면과 영어 UI를 한곳에서 연다. (Figma 269:713 섹션, 279:3751 섹션)
import { router, type Href } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { PageHeader, Screen, SectionLabel } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { useLocale } from '../../src/i18n';
import { colors, layout } from '../../src/theme';

type Item = { label: string; note: string; href: Href };
const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: '편지 읽기 변형 (LT01)',
    items: [
      { label: '받은 첫 편지 · 정중히 넘기기', note: '269:717', href: '/letter/maya-first' },
      { label: '돈 이야기 안내', note: '269:772', href: '/letter/maya-money' },
      { label: '영어 편지 · 문장 선택', note: '269:826', href: '/letter/lena-en' },
      { label: '신고한 편지 (접힘)', note: '277:3657', href: '/letter/maya-reported' },
    ],
  },
  {
    title: '쓰기·도움 (LT02 · AI01)',
    items: [
      { label: '첫 편지 · 최소 길이 전', note: '269:949', href: { pathname: '/write/[id]', params: { id: 'ines', first: '1' } } },
      { label: '첫 편지 · 횟수 제한 없음', note: '269:994', href: { pathname: '/help', params: { first: '1' } } },
    ],
  },
  {
    title: '보내기 (LT03 · LT04)',
    items: [
      { label: '전송 실패', note: '277:3555', href: { pathname: '/letter/confirm', params: { state: 'failed' } } },
      { label: '결과 불명', note: '277:3606', href: { pathname: '/letter/confirm', params: { state: 'unknown' } } },
      { label: '첫 교류', note: '277:3713', href: { pathname: '/letter/sent', params: { kind: 'first-exchange' } } },
    ],
  },
  {
    title: '친구별 기록 (MB05)',
    items: [
      { label: '한 달째 조용함 (Kenji)', note: '269:1069', href: '/friend/kenji' },
      { label: '더보기 메뉴 — 친구별 기록에서 오른쪽 위 ⋯', note: '269:883', href: '/friend/maya' },
    ],
  },
];

export default function StateGallery() {
  const { lang, setLang } = useLocale();
  return (
    <Screen>
      <PageHeader title="상태 보기" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingBottom: 32 }}>
        <SectionLabel>영어 UI (Maya의 시점) — ON01 · MB02 · LT01 · LT03 · AI02</SectionLabel>
        <Pressable accessibilityRole="switch" accessibilityState={{ checked: lang === 'en' }} onPress={() => setLang(lang === 'ko' ? 'en' : 'ko')} style={{ minHeight: 52, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line }}>
          <Txt v="maru16" style={{ flex: 1 }}>앱 화면 언어</Txt>
          <Txt v="caption13" color="sub">{lang === 'ko' ? '한국어 → English로 바꾸기' : 'English → 한국어로 바꾸기'}</Txt>
        </Pressable>
        {lang === 'en'
          ? ([
              ['ON01 Intro', '/onboarding'],
              ['MB02 First letters', '/mailbox/first'],
              ['LT01 Maya reads Jiyun', '/letter/maya-4'],
              ['LT03 Before you send', '/letter/confirm'],
              ['AI02 How would you say this in Korean?', '/translate'],
            ] as const).map(([label, href]) => <Row key={label} item={{ label, note: '279:*', href }} />)
          : null}
        {GROUPS.map((g) => (
          <View key={g.title}>
            <SectionLabel>{g.title}</SectionLabel>
            {g.items.map((it) => <Row key={it.label} item={it} />)}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

function Row({ item }: { item: Item }) {
  return (
    <Pressable accessibilityRole="button" onPress={() => router.push(item.href)} style={{ minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: 8, borderBottomWidth: 1, borderBottomColor: colors.line }}>
      <Txt v="body14" style={{ flex: 1, fontSize: 15, lineHeight: 21 }}>{item.label}</Txt>
      <Txt v="meta12" color="sub">{item.note}</Txt>
    </Pressable>
  );
}
