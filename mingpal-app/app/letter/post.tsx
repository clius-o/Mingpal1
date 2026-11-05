// MB07 밍팔 우체국 편지 — Figma 269:1743. 운영팀 안내 편지(답장 없음). 같은 종이·클립 위에 연습 문장과 안내.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { img } from '../../src/assets';
import { BackBar, Button, Screen } from '../../src/components/primitives';
import { ClipBack, ClipFront } from '../../src/components/PaperClip';
import { Txt } from '../../src/components/Txt';
import { colors } from '../../src/theme';

const STEPS = ['길게 누르면 뜻을 볼 수 있어요', '마음에 드는 표현은 표현장에 저장해요', '친구에게 쓰는 편지에 써 보면\n‘써 본 표현’이 돼요'];

export default function PostOfficeLetter() {
  return (
    <Screen>
      <BackBar />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.sheetWrap}>
          <ClipBack />
          <Image source={img.sheet} style={StyleSheet.absoluteFill} contentFit="fill" />
          <ClipFront />
          <Image source={img.postmark} style={styles.postmark} contentFit="cover" />
          <View style={styles.postmarkText}>
            <Txt v="meta12Medium" color="sub" style={{ fontSize: 10, lineHeight: 13, textAlign: 'center', letterSpacing: 0.6 }}>밍팔</Txt>
            <Txt v="meta12Medium" color="sub" style={{ fontSize: 10, lineHeight: 13, textAlign: 'center', letterSpacing: 0.6 }}>우체국</Txt>
          </View>
          <View style={styles.inner}>
            <View style={{ gap: 4 }}>
              <Txt v="maru16" style={{ fontSize: 20, lineHeight: 26 }}>밍팔 우체국</Txt>
              <Txt v="caption13" color="sub">2026년 11월 4일</Txt>
            </View>
            <View style={styles.headRule} />
            <Txt v="caption13" color="sub">운영팀의 안내 편지 · 답장은 받지 않아요</Txt>
            <Txt v="maru16" style={{ fontSize: 17, lineHeight: 24, marginTop: 8 }}>밍팔에 온 걸 환영해요</Txt>
            <Txt v="body16" style={{ lineHeight: 28 }}>아래 문장을 길게 눌러 보세요.</Txt>
            <View style={styles.quote}>
              <Txt v="meta12" color="sub">연습해 볼 문장</Txt>
              <Txt v="news16Loose" color="ink2" style={{ lineHeight: 21 }}>“I take the long way home when the weather is nice.”</Txt>
            </View>
            <View style={{ gap: 8, marginTop: 4 }}>
              {STEPS.map((s, i) => (
                <View key={s} style={{ flexDirection: 'row', gap: 12 }}>
                  <Txt v="name" color="sub" style={{ fontSize: 17, lineHeight: 26 }}>{i + 1}</Txt>
                  <Txt v="body14" color="ink2" style={{ flex: 1, fontSize: 15, lineHeight: 26 }}>{s}</Txt>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Button label="첫 친구 찾기" onPress={() => router.push('/find')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },
  sheetWrap: { marginTop: 8, minHeight: 560 },
  inner: { paddingHorizontal: 32, paddingTop: 58, paddingBottom: 48, gap: 14 },
  postmark: { position: 'absolute', left: 198, top: 46, width: 128, height: 53, opacity: 0.9 },
  postmarkText: { position: 'absolute', left: 224, top: 65, width: 46 },
  headRule: { height: 1, backgroundColor: colors.lineStrong },
  quote: { borderWidth: 1, borderStyle: 'dashed', borderColor: colors.lineStrong, backgroundColor: colors.paper, paddingHorizontal: 12, paddingVertical: 8, gap: 4 },
  bottom: { paddingHorizontal: 20, paddingBottom: 18 },
});
