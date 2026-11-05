// ME09 플러스 해지 — Figma 269:3198
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const CHANGES = ['쓰기 도움이 하루 10회, 첨삭은 1개만 보여요', '표현장은 100개까지 보여요. 저장한 표현은 지워지지 않아요', '편지는 지금처럼 무료예요'];

export default function PlusCancel() {
  return (
    <Screen>
      <PageHeader title="플러스를 해지할까요?" />
      <View style={{ flex: 1, paddingHorizontal: layout.screenPadding, paddingTop: 16, gap: 10 }}>
        <Txt v="maru16" style={{ marginBottom: 6 }}>12월 3일부터 이렇게 바뀌어요</Txt>
        {CHANGES.map((c) => (
          <View key={c} style={{ flexDirection: 'row', gap: 10 }}>
            <Txt v="strong15" color="sub" style={{ lineHeight: 24 }}>·</Txt>
            <Txt v="maru16" color="ink2" style={{ flex: 1, fontSize: 15, lineHeight: 24 }}>{c}</Txt>
          </View>
        ))}
      </View>
      <View style={{ flexDirection: 'row', gap: 12, paddingHorizontal: layout.screenPadding, paddingBottom: 16 }}>
        <Pressable accessibilityRole="button" style={{ flex: 1, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }} onPress={() => router.back()}>
          <Txt v="strong15">해지하기</Txt>
        </Pressable>
        <Pressable accessibilityRole="button" style={{ flex: 1, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.ink }} onPress={() => router.back()}>
          <Txt v="strong15" color="light">계속 쓸게요</Txt>
        </Pressable>
      </View>
    </Screen>
  );
}
