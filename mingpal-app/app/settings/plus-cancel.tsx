// ME09 플러스 해지 — Figma 269:3198
import { router } from 'expo-router';
import { View } from 'react-native';
import { Bullets, Button, FooterActions, PageHeader, Screen, SecondaryButton } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { layout } from '../../src/theme';

export default function PlusCancel() {
  return (
    <Screen>
      <PageHeader title="플러스를 해지할까요?" />
      <View style={{ flex: 1, paddingHorizontal: layout.screenPadding, paddingTop: 16, gap: 16 }}>
        <Txt v="maru16">12월 3일부터 이렇게 바뀌어요</Txt>
        <Bullets items={['쓰기 도움이 하루 10회, 첨삭은 1개만 보여요', '표현장은 100개까지 보여요. 저장한 표현은 지워지지 않아요', '편지는 지금처럼 무료예요']} />
      </View>
      <FooterActions>
        <SecondaryButton label="해지하기" style={{ flex: 1 }} onPress={() => router.back()} />
        <View style={{ flex: 1 }}><Button label="계속 쓸게요" onPress={() => router.back()} /></View>
      </FooterActions>
    </Screen>
  );
}
