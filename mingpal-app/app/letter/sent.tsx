// LT04 보낸 뒤 완료 — Figma 269:1600. 베타 한정 한 줄 피드백은 첫 편지에서는 묻지 않는다(첫 편지는 이 화면만).
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { img } from '../../src/assets';
import { AiBadge, Button, FooterActions, Icon, Rule, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, fonts, layout } from '../../src/theme';

const WAITING: { label: string; value?: string; to: '/learn/review' | '/memo' | '/find' }[] = [
  { label: '오늘의 복습', value: '5장 · 2분', to: '/learn/review' },
  { label: '일상 메모 남기기', to: '/memo' },
  { label: '두 번째 친구 찾기', to: '/find' },
];

export default function Sent() {
  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 44, paddingBottom: 24 }}>
        <Image source={img.envelopeSent} style={{ alignSelf: 'center', width: 156, height: 210 }} contentFit="contain" />
        <Txt v="title" style={{ marginTop: 14 }}>{'Maya의 우편함에\n도착했어요'}</Txt>
        <View style={{ marginTop: 14 }}><Rule /></View>
        <Txt v="caption13" color="sub" style={{ marginTop: 16 }}>이번 편지 · 영어 214단어 · 새 표현 3개</Txt>
        <Text style={{ marginTop: 10, fontFamily: fonts.maruBold, fontSize: 16, lineHeight: 24, color: colors.ink }}>
          <Text style={{ fontFamily: fonts.newsRegular, fontStyle: 'italic', fontSize: 18 }}>take the long way</Text>
          를 처음으로 편지에 썼어요
        </Text>
        <Pressable accessibilityRole="button" onPress={() => router.push('/review')} style={{ minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, borderBottomWidth: 1, borderBottomColor: colors.line }}>
          <Txt v="strong14" style={{ fontSize: 13, lineHeight: 18 }}>나만 보는 첨삭 보기</Txt>
          <AiBadge />
          <View style={{ flex: 1 }} />
          <Icon source={img.chevron} style={{ transform: [{ rotate: '180deg' }] }} />
        </Pressable>
        <Txt v="meta12Strong" color="sub" style={{ marginTop: 24, marginBottom: 6 }}>기다리는 동안</Txt>
        {WAITING.map((w) => (
          <Pressable key={w.label} accessibilityRole="button" onPress={() => router.push(w.to)} style={{ minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: 8, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Txt v="maru16" style={{ flex: 1, fontSize: 15, lineHeight: 21 }}>{w.label}</Txt>
            {w.value ? <Txt v="caption13" color="sub">{w.value}</Txt> : null}
            <Icon source={img.chevron} style={{ transform: [{ rotate: '180deg' }] }} />
          </Pressable>
        ))}
      </ScrollView>
      <FooterActions>
        <View style={{ flex: 1 }}><Button label="Maya와의 편지로" onPress={() => router.replace('/friend/maya')} /></View>
      </FooterActions>
    </Screen>
  );
}
