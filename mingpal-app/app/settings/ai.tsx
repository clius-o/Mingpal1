// ME07 AI 도움 안내 — Figma 269:3135
import { ScrollView, View } from 'react-native';
import { PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const SECTIONS: { title: string; lines: string[] }[] = [
  { title: '친구에게는 보이지 않아요', lines: ['내가 고른 문장만 편지에 들어가요. 도움을 받았다는 표시는 남지 않아요'] },
  { title: '친구들도 같은 도움을 받을 수 있어요', lines: ['편지 전체를 AI가 쓰지는 않아요. 표현 찾기는 한 번에 최대 2문장, 편지에는 한 문장씩 넣어요'] },
  {
    title: 'AI에 전달되는 것',
    lines: ['· 내가 고른 문장과 적은 생각', '· ‘뜻 보기’나 ‘영어로는?’을 누른 문장', '· 첨삭을 위해 내가 보낸 편지', '· 안전 검사를 위해 오가는 모든 편지'],
  },
  { title: '전달되지 않는 것', lines: ['표현 찾기를 누르기 전의 일상 메모, 내 프로필'] },
  { title: 'AI 설명은 틀릴 수 있어요', lines: ['마음에 드는 것만 골라 쓰세요'] },
];

export default function AiGuide() {
  return (
    <Screen>
      <PageHeader title="AI 도움 안내" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingBottom: 32 }}>
        {SECTIONS.map((s) => (
          <View key={s.title} style={{ paddingVertical: 14, gap: 4, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Txt v="maru16">{s.title}</Txt>
            {s.lines.map((l) => (
              <Txt key={l} v="caption13" color="ink2" style={{ lineHeight: 20 }}>{l}</Txt>
            ))}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
