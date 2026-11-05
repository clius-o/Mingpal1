// ON04 언어 — Figma 269:1877 (진행 2/7)
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Chip, ChipRow, FieldLabel, LevelCard, OnboardingScreen } from '../../src/components/onboarding';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const LEVELS = [
  { id: 'start', label: '처음 배워요', sample: 'Hello. I am Jiyun.' },
  { id: 'simple', label: '간단한 문장', sample: 'I like coffee. I live in Seoul.' },
  { id: 'daily', label: '일상 이야기', sample: 'Last weekend I went hiking with my friends.' },
  { id: 'free', label: '자유롭게', sample: 'I’ve been trying to leave weekends unplanned.' },
];

export default function Language() {
  const [learn, setLearn] = useState<'en' | 'none'>('en');
  const [level, setLevel] = useState('daily');
  return (
    <OnboardingScreen step={2} primaryLabel="다음" onPrimary={() => router.push('/onboarding/avatar')}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 8, paddingBottom: 16, gap: 20 }}>
        <Txt v="maru18" style={{ fontSize: 24, lineHeight: 32 }}>어떤 말로 편지를 쓸까요?</Txt>
        <View>
          <FieldLabel>모국어</FieldLabel>
          <ChipRow>
            <Chip label="한국어" selected />
            <Chip label="+ 하나 더 (선택)" />
          </ChipRow>
        </View>
        <View>
          <FieldLabel>잘하는 언어 (선택)</FieldLabel>
          <ChipRow><Chip label="+ 고르기" /></ChipRow>
        </View>
        <View>
          <FieldLabel>배우는 언어</FieldLabel>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {([['en', '영어', false], ['ko', '한국어', true], ['none', '없음', false]] as const).map(([k, label, disabled]) => {
              const on = !disabled && learn === k;
              return (
                <Pressable
                  key={k}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on, disabled }}
                  disabled={disabled}
                  onPress={() => setLearn(k as 'en' | 'none')}
                  style={{ flex: 1, height: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? colors.ink : colors.card, borderWidth: 1, borderColor: on ? colors.ink : colors.line, opacity: disabled ? 0.4 : 1 }}
                >
                  <Txt v={on ? 'strong15' : 'medium16'} color={on ? 'light' : 'ink'} style={{ fontSize: 15, lineHeight: 20 }}>{label}</Txt>
                </Pressable>
              );
            })}
          </View>
          <Txt v="meta12" color="sub" style={{ marginTop: 8, lineHeight: 18 }}>모국어·잘하는 언어는 고를 수 없어요.</Txt>
        </View>
        <View style={{ gap: 8 }}>
          <FieldLabel>영어로 이 정도 쓸 수 있어요</FieldLabel>
          {LEVELS.map((l) => (
            <LevelCard key={l.id} label={l.label} sample={l.sample} selected={level === l.id} onPress={() => setLevel(l.id)} />
          ))}
          <Txt v="caption13" color="sub" style={{ marginTop: 4, lineHeight: 18 }}>예문을 보고 가장 비슷한 것을 골라요. 나중에 바꿀 수 있어요.</Txt>
        </View>
      </ScrollView>
    </OnboardingScreen>
  );
}
