// RL03 종료된 기록 — Figma 269:2491. 읽기 전용, 7일 안에는 마치기를 취소할 수 있다.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { BackBar, Rule, Screen, SecondaryButton } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const LOG = [
  { who: '나 · 마지막 인사', date: '11월 4일', text: 'Thank you for all the letters. Take care!' },
  { who: 'Oliver', date: '8월 14일', text: 'Sorry for the late reply. Work has been crazy, but I finally…' },
  { who: '나', date: '7월 30일', text: 'The rainy season is finally over in Seoul. Yesterday I…' },
];

export default function Ended() {
  return (
    <Screen>
      <BackBar />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 6 }}>
          <Image source={img.avatarA4} style={{ width: 56, height: 56 }} contentFit="contain" />
          <View>
            <Txt v="name" style={{ fontSize: 26, lineHeight: 32 }}>Oliver</Txt>
            <Txt v="caption13" color="sub" style={{ lineHeight: 18 }}>멜버른 · 2026년 3월 ~ 11월</Txt>
          </View>
        </View>
        <View style={{ marginTop: 22 }}><Rule /></View>
        <Txt v="maru16" style={{ fontSize: 17, lineHeight: 24, marginTop: 18 }}>이 편지는 마무리되었어요 · 11월 4일</Txt>
        <Txt v="caption13" color="sub" style={{ lineHeight: 20, marginTop: 6 }}>편지를 읽을 수만 있어요 · 11월 11일까지 종료를 취소할 수 있어요</Txt>
        <View style={{ marginTop: 20 }}><SecondaryButton label="마치기 취소" onPress={() => router.back()} /></View>
        <View style={{ marginTop: 26 }}>
          {LOG.map((l) => (
            <View key={l.who + l.date} style={{ paddingVertical: 14, gap: 4, borderBottomWidth: 1, borderBottomColor: colors.line }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Txt v="name" style={{ fontSize: 18, lineHeight: 24 }}>{l.who}</Txt>
                <Txt v="caption13" color="sub" style={{ lineHeight: 18 }}>{l.date}</Txt>
              </View>
              <Txt v="news16" color="ink2" style={{ fontSize: 15, lineHeight: 21 }}>{l.text}</Txt>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
