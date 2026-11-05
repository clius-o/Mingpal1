// ON08 첫 추천 — Figma 269:3371 (진행 7/7). 후보가 없으면 조건을 넓혀 보여 준다.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { OnboardingScreen } from '../../src/components/onboarding';
import { Txt } from '../../src/components/Txt';
import { firstRecommendations } from '../../src/data/mock';
import { colors, layout } from '../../src/theme';

export default function FirstRecommendations() {
  const done = () => router.replace('/');
  return (
    <OnboardingScreen step={7} secondaryLabel="나중에 쓸게요" onSecondary={done} hint="후보가 없으면 조건을 넓혀 보여 드려요">
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 8, paddingBottom: 16 }}>
        <Txt v="maru18" style={{ fontSize: 24, lineHeight: 32 }}>{'이런 하루를 보내는\n친구들이 있어요'}</Txt>
        <Txt v="caption13" color="sub" style={{ marginTop: 12, marginBottom: 14, lineHeight: 20 }}>궁금한 장면이 있으면 첫 편지를 써 보세요.</Txt>
        {firstRecommendations.map((r) => (
          <Pressable key={r.id} accessibilityRole="button" onPress={() => router.push({ pathname: '/profile/[id]', params: { id: r.id } })} style={{ paddingVertical: 18, gap: 14, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Txt v={r.english ? 'news20' : 'maru16'} style={{ fontSize: 17, lineHeight: 26 }}>{r.quote}</Txt>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Image source={r.avatar} style={{ width: 36, height: 36 }} contentFit="contain" />
              <View>
                <Txt v="name" style={{ fontSize: 18, lineHeight: 24 }}>{r.name}</Txt>
                <Txt v="caption13" color="sub" style={{ lineHeight: 16 }}>{r.meta}</Txt>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </OnboardingScreen>
  );
}
