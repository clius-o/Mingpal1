// SY01 알림 권한 — Figma 269:1637. 시스템 권한 창 전에 먼저 보여 주는 안내. "나중에"로 넘길 수 있다.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { img } from '../../src/assets';
import { Button, FooterActions, Rule, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

export default function NotifyPermission() {
  return (
    <Screen>
      <View style={{ flex: 1, paddingHorizontal: layout.screenPadding, paddingTop: 36 }}>
        <Image source={img.stampOlive} style={{ position: 'absolute', right: 28, top: 4, width: 62, height: 80 }} contentFit="contain" />
        <Txt v="title" style={{ width: 270 }}>{'답장이 오면\n알려 드릴까요?'}</Txt>
        <View style={{ marginTop: 20 }}><Rule /></View>
        <Txt v="maru16" color="ink2" style={{ fontSize: 15, lineHeight: 21, marginTop: 18 }}>편지가 도착했을 때만 알려요.</Txt>
        <View style={{ marginTop: 28, height: 76, flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 15, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}>
          <Image source={img.stampOlive} style={{ width: 36, height: 47 }} contentFit="contain" />
          <View style={{ gap: 2 }}>
            <Txt v="strong14" color="sub" style={{ fontSize: 13 }}>밍팔</Txt>
            <Txt v="medium16" style={{ fontSize: 15, lineHeight: 20 }}>Maya의 편지가 도착했어요</Txt>
          </View>
        </View>
        <Image source={img.illNotify} style={{ alignSelf: 'center', marginTop: 80, width: 202, height: 220 }} contentFit="contain" />
      </View>
      <FooterActions>
        <View style={{ flex: 1 }}><Button label="알림 받기" onPress={() => router.back()} /></View>
      </FooterActions>
      <Pressable accessibilityRole="button" style={{ minHeight: 44, alignItems: 'center', justifyContent: 'center', marginBottom: 6 }} onPress={() => router.back()}>
        <Txt v="body14Medium">나중에</Txt>
      </Pressable>
    </Screen>
  );
}
