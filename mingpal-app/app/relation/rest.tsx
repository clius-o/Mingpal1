// RL01 잠시 쉬기 — Figma 269:2433. 이유는 묻지 않고, 돌아올 시점은 선택.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { Chip, ChipRow, FieldLabel } from '../../src/components/onboarding';
import { Bullets, Button, FooterActions, PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const RETURN_OPTIONS = [
  { label: '정하지 않음', days: 0 },
  { label: '3일 뒤', days: 3 },
  { label: '1주 뒤', days: 7 },
  { label: '2주 뒤', days: 14 },
];

export default function Rest() {
  const [days, setDays] = useState(0);
  const back = new Date();
  back.setDate(back.getDate() + days);
  const preview = days === 0 ? '편지를 쉬고 있어요' : `편지를 쉬고 있어요 · ${back.getMonth() + 1}월 ${back.getDate()}일쯤 돌아와요`;
  return (
    <Screen>
      <PageHeader title="잠시 쉬기" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 20, paddingBottom: 16, gap: 28 }}>
        <Bullets items={['새 첫 편지를 받지 않고, 친구 찾기에서 빠져요', '지금 친구들과는 계속 읽고 쓸 수 있어요', '이유는 묻지 않아요']} />
        <View>
          <FieldLabel>돌아올 때 (선택)</FieldLabel>
          <ChipRow>
            {RETURN_OPTIONS.map((o) => (
              <Chip key={o.label} label={o.label} selected={days === o.days} onPress={() => setDays(o.days)} />
            ))}
          </ChipRow>
        </View>
        <View>
          <FieldLabel>친구에게 이렇게 보여요</FieldLabel>
          <View style={{ minHeight: 76, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 13, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}>
            <Image source={img.avatarJiyoon} style={{ width: 48, height: 48 }} contentFit="contain" />
            <View style={{ flex: 1 }}>
              <Txt v="name" style={{ fontSize: 18, lineHeight: 24 }}>지윤</Txt>
              <Txt v="meta12" color="sub" style={{ lineHeight: 18 }}>{preview}</Txt>
            </View>
          </View>
        </View>
      </ScrollView>
      <FooterActions>
        <View style={{ flex: 1 }}><Button label="저장" onPress={() => router.back()} /></View>
      </FooterActions>
    </Screen>
  );
}
