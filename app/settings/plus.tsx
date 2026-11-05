// ME08 밍팔 플러스 — Figma 269:3159. 가격은 Figma에서도 "[가격 미정]" 자리표시입니다.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { Button, PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const ROWS = [
  ['편지 읽기·쓰기', '무제한', '무제한'],
  ['읽기 도움 (뜻 보기·영어로는?)', '무제한', '무제한'],
  ['쓰기 도움 (표현 찾기·다듬기)', '하루 10회', '넉넉히'],
  ['나만 보는 첨삭', '고칠 곳 1개', '최대 3개 + 이유'],
  ['표현장', '100개', '무제한'],
] as const;

export default function Plus() {
  return (
    <Screen>
      <PageHeader title="밍팔 플러스" />
      <Image source={img.illPlus} style={{ position: 'absolute', right: 27, top: 40, width: 64, height: 92 }} contentFit="contain" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 14, paddingBottom: 24, gap: 16 }}>
        <Txt v="maru16" color="ink2" style={{ fontSize: 15, lineHeight: 22 }}>편지는 언제나 무료예요. 플러스는 쓰기 도움을 더 넉넉하게 해 줘요.</Txt>
        <View>
          <View style={{ flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <View style={{ flex: 1 }} />
            <Txt v="meta12Strong" color="sub" style={{ width: 92 }}>무료</Txt>
            <Txt v="meta12Strong" color="sub" style={{ width: 104 }}>플러스</Txt>
          </View>
          {ROWS.map(([name, free, plus]) => (
            <View key={name} style={{ flexDirection: 'row', alignItems: 'center', minHeight: 44, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.line }}>
              <Txt v="maru16" style={{ flex: 1, fontSize: 14, lineHeight: 20, paddingRight: 8 }}>{name}</Txt>
              <Txt v="caption13" color="ink2" style={{ width: 92, lineHeight: 20 }}>{free}</Txt>
              <Txt v="body14Medium" style={{ width: 104, fontSize: 13, lineHeight: 20 }}>{plus}</Txt>
            </View>
          ))}
        </View>
        <Txt v="caption13" color="sub">첫 편지 3통은 쓰기 도움 횟수에서 빼요</Txt>
        <View style={{ gap: 4 }}>
          <Txt v="maru16" style={{ fontSize: 17, lineHeight: 24 }}>월 [가격 미정]</Txt>
          <Txt v="caption13" color="sub">언제든 해지할 수 있어요. 베타 기간에는 모든 기능이 무료예요.</Txt>
        </View>
        <Button label="플러스 시작하기" />
        <Pressable accessibilityRole="button" style={{ minHeight: 44, alignItems: 'center', justifyContent: 'center' }} onPress={() => router.push('/settings/plus-cancel')}>
          <Txt v="body14Medium" color="sub" style={{ fontSize: 13 }}>플러스를 쓰는 중일 때 · 해지하기</Txt>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
