// ON09 아바타 고르기 — Figma 269:1928 (진행 3/7). 사진 대신 아바타가 친구에게 보인다.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { OnboardingScreen } from '../../src/components/onboarding';
import { Txt } from '../../src/components/Txt';
import { avatarChoices } from '../../src/data/mock';
import { colors, layout } from '../../src/theme';

export default function AvatarPicker() {
  const [pick, setPick] = useState('a7');
  const chosen = avatarChoices.find((a) => a.id === pick) ?? avatarChoices[0];
  const next = () => router.push('/onboarding/scene');
  return (
    <OnboardingScreen step={3} primaryLabel="다음" onPrimary={next} secondaryLabel="다음에 하기" onSecondary={next}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 8, paddingBottom: 16, gap: 14 }}>
        <Txt v="maru18" style={{ fontSize: 24, lineHeight: 32 }}>{'편지에 쓸 아바타를\n골라 보세요'}</Txt>
        <Txt v="caption13" color="sub" style={{ lineHeight: 20 }}>사진 대신 이 아바타가 친구에게 보여요. 골라 두었으니 넘어가도, 나중에 바꿔도 돼요.</Txt>
        <View style={{ height: 92, flexDirection: 'row', alignItems: 'center', gap: 16, paddingHorizontal: 15, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}>
          <Image source={chosen.source} style={{ width: 64, height: 64 }} contentFit="contain" />
          <View style={{ gap: 2 }}>
            <Txt v="name">지윤 · 서울</Txt>
            <Txt v="meta12" color="sub">친구에게 이렇게 보여요</Txt>
          </View>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 20, paddingHorizontal: 4, marginTop: 10 }}>
          {avatarChoices.map((a) => {
            const on = a.id === pick;
            return (
              <Pressable key={a.id} accessibilityRole="radio" accessibilityLabel={`아바타 ${a.id}`} accessibilityState={{ selected: on }} onPress={() => setPick(a.id)} style={[{ width: 76, height: 76 }, on && { borderWidth: 3, borderColor: colors.ink }]}>
                <Image source={a.source} style={{ width: '100%', height: '100%' }} contentFit="contain" />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </OnboardingScreen>
  );
}
