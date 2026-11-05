// ON06 관심사·취향·편지 시간 — Figma 269:3279 (진행 5/7)
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Chip, ChipRow, FieldLabel, OnboardingScreen } from '../../src/components/onboarding';
import { Txt } from '../../src/components/Txt';
import { layout } from '../../src/theme';

const INTERESTS = ['요리', '영화', '빵집 탐방', '음악', '등산', '사진', '산책', '책', '여행', '반려동물'];
const LENGTHS = ['짧게', '여유 있게', '상관없음'];
const RHYTHMS = ['며칠에 한 번', '일주일쯤', '여유롭게'];
const TIMES = ['일요일 저녁', '평일 퇴근 후', '정하지 않기'];
const MAX_INTERESTS = 5;

export default function Taste() {
  const [interests, setInterests] = useState<string[]>(['요리', '빵집 탐방', '산책']);
  const [length, setLength] = useState('여유 있게');
  const [rhythm, setRhythm] = useState('일주일쯤');
  const [time, setTime] = useState('일요일 저녁');
  const next = () => router.push('/onboarding/ai');
  const toggle = (i: string) =>
    setInterests((cur) => (cur.includes(i) ? cur.filter((x) => x !== i) : cur.length < MAX_INTERESTS ? [...cur, i] : cur));
  const note = (t: string) => <Txt v="caption13" color="sub" style={{ marginTop: 8, lineHeight: 18 }}>{t}</Txt>;
  return (
    <OnboardingScreen step={5} primaryLabel="다음" onPrimary={next} secondaryLabel="다음에 하기" onSecondary={next}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 8, paddingBottom: 16, gap: 22 }}>
        <View>
          <Txt v="maru18" style={{ fontSize: 24, lineHeight: 32 }}>무엇을 좋아하나요?</Txt>
          <Txt v="caption13" color="sub" style={{ marginTop: 6, marginBottom: 14, lineHeight: 18 }}>{`최대 ${MAX_INTERESTS}개 · ${interests.length}개 골랐어요`}</Txt>
          <ChipRow>
            {INTERESTS.map((i) => (
              <Chip key={i} label={i} selected={interests.includes(i)} onPress={() => toggle(i)} />
            ))}
          </ChipRow>
        </View>
        <View>
          <FieldLabel>편지 길이</FieldLabel>
          <ChipRow>{LENGTHS.map((l) => <Chip key={l} label={l} selected={length === l} onPress={() => setLength(l)} />)}</ChipRow>
        </View>
        <View>
          <FieldLabel>답장 리듬</FieldLabel>
          <ChipRow>{RHYTHMS.map((r) => <Chip key={r} label={r} selected={rhythm === r} onPress={() => setRhythm(r)} />)}</ChipRow>
          {note('약속이 아니라 친구에게 보여 주는 참고예요. 늦어도 괜찮아요.')}
        </View>
        <View>
          <FieldLabel>편지 쓰는 시간 (선택)</FieldLabel>
          <ChipRow>{TIMES.map((t) => <Chip key={t} label={t} selected={time === t} onPress={() => setTime(t)} />)}</ChipRow>
          {note('그 시간에 쓰던 편지나 이번 주의 질문을 알려 드려요.')}
        </View>
      </ScrollView>
    </OnboardingScreen>
  );
}
