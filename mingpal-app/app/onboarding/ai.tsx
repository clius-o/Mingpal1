// ON07 AI 안내 — Figma 269:3341 (진행 6/7)
// Figma의 "안전 검사를 위해 안전 검사를 위해 …" 중복 문구는 오타로 보고 ME07과 같게 한 번만 썼다.
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { OnboardingScreen } from '../../src/components/onboarding';
import { Rule } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const SECTIONS: { title: string; lines: string[] }[] = [
  { title: '친구에게는 보이지 않아요', lines: ['내가 고른 문장만 편지에 들어가요. 도움을 받았다는 표시는 남지 않아요'] },
  { title: '친구들도 같은 도움을 받을 수 있어요', lines: ['친구들도 표현을 찾을 때 AI 도움을 받을 수 있어요'] },
  { title: 'AI에 전달되는 것', lines: ['· 내가 고른 문장과 적은 생각', '· ‘뜻 보기’나 ‘영어로는?’을 누른 문장', '· 첨삭을 위해 내가 보낸 편지', '· 안전 검사를 위해 오가는 모든 편지'] },
  { title: 'AI 설명은 틀릴 수 있어요', lines: ['마음에 드는 것만 골라 쓰세요'] },
];

export default function AiNotice() {
  return (
    <OnboardingScreen step={6} primaryLabel="확인했어요" onPrimary={() => router.push('/onboarding/first')}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 8, paddingBottom: 16 }}>
        <Txt v="maru18" style={{ fontSize: 24, lineHeight: 32 }}>{'막히면 AI가 도와요.\n그 도움은 나만 알아요'}</Txt>
        <View style={{ marginTop: 14 }}><Rule /></View>
        {SECTIONS.map((s) => (
          <View key={s.title} style={{ paddingVertical: 14, gap: 4, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Txt v="maru16">{s.title}</Txt>
            {s.lines.map((l) => (
              <Txt key={l} v="caption13" color="ink2" style={{ lineHeight: 20 }}>{l}</Txt>
            ))}
          </View>
        ))}
      </ScrollView>
    </OnboardingScreen>
  );
}
