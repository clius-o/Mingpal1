// LT03 보내기 전 확인 — Figma 269:1552. 보낸 편지는 취소하거나 고칠 수 없다.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { img } from '../../src/assets';
import { BackBar, Button, Screen, SecondaryButton } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { sendPreview } from '../../src/data/mock';
import { colors } from '../../src/theme';

export default function ConfirmSend() {
  return (
    <Screen>
      <View>
        <BackBar />
        <Txt v="strong15" style={{ position: 'absolute', left: 56, top: 12, lineHeight: 20 }}>보내기 전 확인</Txt>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={img.envelope} style={styles.envelope} contentFit="contain" accessibilityElementsHidden />
        <View style={styles.sheetWrap}>
          <Image source={img.sheet} style={StyleSheet.absoluteFill} contentFit="fill" />
          <Image source={img.stampSeoul} style={styles.stamp} contentFit="cover" />
          <View style={styles.inner}>
            <View style={{ gap: 4 }}>
              <Txt v="name">To. Maya</Txt>
              <Txt v="caption13" color="sub">리스본, 10,400km 떨어진 곳으로</Txt>
            </View>
            <View style={styles.headRule} />
            <View style={{ gap: 11, marginTop: 4 }}>
              {sendPreview.map((p, i) => (
                <Txt key={i} v="news16Loose" style={{ fontSize: 17, lineHeight: 27 }}>{p}</Txt>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <Txt v="caption13" color="ink2" style={{ textAlign: 'center', marginBottom: 8 }}>보낸 편지는 취소하거나 고칠 수 없어요.</Txt>
      <View style={styles.bottom}>
        <SecondaryButton label="더 고치기" style={{ width: 120 }} onPress={() => router.back()} />
        <View style={{ flex: 1 }}><Button label="편지 보내기" onPress={() => router.replace('/letter/sent')} /></View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },
  envelope: { position: 'absolute', right: 22, top: -6, width: 96, height: 77 },
  sheetWrap: { marginTop: 66, minHeight: 560 },
  inner: { paddingHorizontal: 32, paddingTop: 58, paddingBottom: 48, gap: 14 },
  stamp: { position: 'absolute', left: 278, top: 16, width: 52, height: 68, transform: [{ rotate: '-3deg' }] },
  headRule: { height: 1, backgroundColor: colors.lineStrong },
  bottom: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingBottom: 18 },
});
