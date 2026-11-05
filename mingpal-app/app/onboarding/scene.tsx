// ON05 오늘의 한 장면 — Figma 269:3250 (진행 4/7). 장면을 쓰기 전에는 친구 찾기에 보이지 않는다.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { OnboardingScreen, FieldLabel } from '../../src/components/onboarding';
import { Txt } from '../../src/components/Txt';
import { colors, fonts, layout } from '../../src/theme';

const SAMPLE = 'Every Sunday morning, I walk to a bakery I’ve never been to and pick just one bread. Last week it was a sweet potato bun.';

export default function Scene() {
  const [text, setText] = useState(SAMPLE);
  const next = () => router.push('/onboarding/taste');
  return (
    <OnboardingScreen step={4} primaryLabel="다음" primaryDisabled={text.trim().length === 0} onPrimary={next} secondaryLabel="다음에 하기" onSecondary={next} hint="장면을 쓰기 전에는 친구 찾기에 보이지 않아요">
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 8, paddingBottom: 16, gap: 16 }}>
        <Txt v="maru18" style={{ fontSize: 24, lineHeight: 32 }}>{'요즘 당신의 하루에서\n한 장면을 보여 주세요'}</Txt>
        <Txt v="caption13" color="sub" style={{ lineHeight: 20 }}>영어로 1~3문장. 친구들이 이 장면을 보고 첫 편지를 써요.</Txt>
        <Pressable accessibilityRole="button" style={{ height: 48, justifyContent: 'center', paddingHorizontal: 13, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}>
          <Txt v="strong14" style={{ fontSize: 13, lineHeight: 20 }}>예시 보기</Txt>
        </Pressable>
        <View>
          <FieldLabel>나의 한 장면</FieldLabel>
          <TextInput
            accessibilityLabel="나의 한 장면"
            multiline
            value={text}
            onChangeText={setText}
            textAlignVertical="top"
            style={{ height: 140, padding: 14, backgroundColor: colors.card, borderWidth: 2, borderColor: colors.ink, fontFamily: fonts.newsRegular, fontSize: 17, lineHeight: 26, color: colors.ink }}
          />
        </View>
        {/* AI output is always marked (spec §13). */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable accessibilityRole="button" style={{ minHeight: 44, justifyContent: 'center' }}>
            <View style={{ height: 40, width: 200, justifyContent: 'center', paddingHorizontal: 11, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.sub }}>
              <Txt v="body14Medium" style={{ fontSize: 12, lineHeight: 20 }}>표현 찾기 · AI · 횟수 제한 없음</Txt>
            </View>
          </Pressable>
          <Txt v="meta12" color="sub" style={{ lineHeight: 18 }}>2문장</Txt>
        </View>
        <Txt v="caption13" color="sub" style={{ lineHeight: 18 }}>넓은 취미(영화, 여행)보다 구체적인 순간이 편지 거리가 돼요.</Txt>
      </ScrollView>
    </OnboardingScreen>
  );
}
