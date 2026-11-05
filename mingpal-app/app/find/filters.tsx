// FD02 조건 — Figma 269:2251
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Chip, ChipRow, FieldLabel } from '../../src/components/onboarding';
import { Button, FooterActions, PageHeader, Screen, SecondaryButton, SettingsRow } from '../../src/components/primitives';
import { layout } from '../../src/theme';

const INITIAL = { mode: '모두', level: '모두', interests: ['요리', '빵집 탐방', '산책'], taste: '상관없음' };

export default function Filters() {
  const [mode, setMode] = useState(INITIAL.mode);
  const [level, setLevel] = useState(INITIAL.level);
  const [interests, setInterests] = useState<string[]>(INITIAL.interests);
  const [taste, setTaste] = useState(INITIAL.taste);
  const toggle = (i: string) => setInterests((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));
  const clear = () => { setMode('모두'); setLevel('모두'); setInterests([]); setTaste('상관없음'); };
  const group = (label: string, options: string[], value: string, set: (v: string) => void) => (
    <View>
      <FieldLabel>{label}</FieldLabel>
      <ChipRow>{options.map((o) => <Chip key={o} label={o} selected={value === o} onPress={() => set(o)} />)}</ChipRow>
    </View>
  );
  return (
    <Screen>
      <PageHeader title="조건" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 20, paddingBottom: 16, gap: 22 }}>
        {group('편지 방식', ['모두', '나는 영어로, 상대는 한국어로', '둘 다 영어로'], mode, setMode)}
        {group('상대의 수준', ['모두', '나와 비슷하게', '원어민·자유롭게'], level, setLevel)}
        <View>
          <FieldLabel>관심사</FieldLabel>
          <ChipRow>
            {['요리', '빵집 탐방', '산책'].map((i) => <Chip key={i} label={i} selected={interests.includes(i)} onPress={() => toggle(i)} />)}
            <Chip label="+ 다른 관심사" />
          </ChipRow>
        </View>
        <View>
          <FieldLabel>나라</FieldLabel>
          <SettingsRow label="모든 나라" />
        </View>
        {group('편지 취향', ['상관없음', '나와 비슷한 답장 리듬'], taste, setTaste)}
      </ScrollView>
      <FooterActions>
        <SecondaryButton label="조건 비우기" style={{ width: 120 }} onPress={clear} />
        <View style={{ flex: 1 }}><Button label="이 조건으로 보기" onPress={() => router.back()} /></View>
      </FooterActions>
    </Screen>
  );
}
