// MB06 일상 메모 (시트) — Figma 269:2061. 메모는 나만 보고, AI로 가는 것은 '표현 찾기'를 누른 문장뿐이다.
import { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { Button, SecondaryButton } from '../src/components/primitives';
import { Sheet } from '../src/components/Sheet';
import { Txt } from '../src/components/Txt';
import { colors, fonts } from '../src/theme';

type Memo = { id: string; text: string; english?: boolean; meta: string };

const INITIAL: Memo[] = [
  { id: 'm1', text: '일요일마다 엄마랑 시장에 감. 별거 아닌데 제일 집 같음', meta: '11월 2일 · 아직 편지에 안 씀' },
  { id: 'm2', text: 'Found a tiny café with only four tables near work.', english: true, meta: '10월 31일 · Lena에게 쓴 편지에 넣음' },
];

export default function Memo() {
  const [draft, setDraft] = useState('');
  const [memos, setMemos] = useState(INITIAL);
  const save = () => {
    const text = draft.trim();
    if (!text) return;
    const d = new Date();
    setMemos((m) => [{ id: `m${Date.now()}`, text, meta: `${d.getMonth() + 1}월 ${d.getDate()}일 · 아직 편지에 안 씀` }, ...m]);
    setDraft('');
  };
  return (
    <Sheet title="일상 메모" closeLabel="닫기" surface="#fbf9f3" dim={0.35} maxHeight={560}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ gap: 14 }}>
        <Txt v="caption13" color="sub" style={{ lineHeight: 20 }}>편지에 쓸 만한 순간을 한두 줄 남겨 두세요. 한국어로 적어도 돼요.</Txt>
        <TextInput
          accessibilityLabel="일상 메모"
          multiline
          placeholder="일요일마다 엄마랑 시장에 감."
          placeholderTextColor={colors.sub}
          value={draft}
          onChangeText={setDraft}
          textAlignVertical="top"
          style={{ height: 84, padding: 13, backgroundColor: colors.light, borderWidth: 1, borderColor: colors.line, fontFamily: fonts.prRegular, fontSize: 16, lineHeight: 24, color: colors.ink }}
        />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* AI output is always marked (spec §13). AI is not connected yet. */}
          <SecondaryButton label="영어로 표현 찾기 · AI" style={{ flex: 230 }} disabled={draft.trim().length === 0} />
          <View style={{ flex: 102 }}><Button label="남기기" onPress={save} disabled={draft.trim().length === 0} /></View>
        </View>
        <Txt v="meta12Strong" color="sub" style={{ marginTop: 6 }}>이번 주</Txt>
        {memos.map((m, i) => (
          <View key={m.id} style={{ gap: 4, paddingBottom: 14, borderBottomWidth: i === memos.length - 1 ? 0 : 1, borderBottomColor: colors.line }}>
            <Txt v={m.english ? 'news16' : 'maru16'} style={{ fontSize: 15, lineHeight: 22 }}>{m.text}</Txt>
            <Txt v="meta12" color="sub">{m.meta}</Txt>
          </View>
        ))}
        <Txt v="caption13" color="sub" style={{ lineHeight: 18 }}>메모는 나만 봐요. AI로 가는 것은 표현 찾기를 누른 문장뿐이에요.</Txt>
      </ScrollView>
    </Sheet>
  );
}
