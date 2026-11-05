// LT01 편지 읽기 (v3 · C안 "읽기 도구 줄") — Figma 284:5833
// Figma positions the sheet art absolutely; here the letter flows inside the sheet so large text / long letters work.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { img } from '../../src/assets';
import { AiBadge, BackBar, Button, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { mayaLetterBody } from '../../src/data/mock';
import { colors } from '../../src/theme';

export default function ReadLetter() {
  // Selected sentence(s) get the olive highlight; tools act on the selection (spec §4.3, §13: tap-select is the long-press alternative).
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Screen>
      <BackBar showMore />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={img.envelope} style={styles.envelope} contentFit="contain" accessibilityElementsHidden />
        <View style={styles.sheetWrap}>
          <Image source={img.sheet} style={StyleSheet.absoluteFill} contentFit="fill" />
          <Image source={img.stampOliveLetter} style={styles.stamp} contentFit="contain" />
          <Image source={img.postmark} style={styles.postmark} contentFit="cover" />
          <View style={styles.postmarkText}>
            <Txt v="news14" color="sub" style={{ fontSize: 11, textAlign: 'center', lineHeight: 12 }}>4 NOV</Txt>
            <Txt v="news14" color="sub" style={{ fontSize: 11, textAlign: 'center', lineHeight: 12 }}>2026</Txt>
          </View>

          <View style={styles.inner}>
            <View style={{ gap: 4 }}>
              <Txt v="name">From. Maya</Txt>
              <Txt v="meta12" color="sub" style={{ lineHeight: 18 }}>2026년 11월 4일</Txt>
              <Txt v="caption13" color="ink2">리스본, 10,400km 떨어진 곳에서</Txt>
            </View>
            <View style={styles.headRule} />

            <View style={styles.newCountry}>
              <Image source={img.stampPortugal} style={{ width: 16, height: 20 }} contentFit="cover" />
              <Txt v="caption13">포르투갈 우표가 도착했어요</Txt>
            </View>

            <View style={styles.quote}>
              <Txt v="meta12" color="sub">지윤 씨가 쓴 문장</Txt>
              <Txt v="news16Loose" color="ink2" style={{ lineHeight: 21 }}>“Sunday mornings are a little louder here.”</Txt>
            </View>

            <View>
              {mayaLetterBody.map((line, i) => (
                <Pressable
                  key={i}
                  accessibilityRole="button"
                  accessibilityLabel={`문장 메뉴 열기: ${line}`}
                  onPress={() => setSelected(selected === i ? null : i)}
                  onLongPress={() => setSelected(i)}
                >
                  <Txt v="body16" style={selected === i ? styles.selected : undefined}>{line}</Txt>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <View style={styles.tools}>
          <Pressable accessibilityRole="button" style={styles.tool} onPress={() => router.push('/translate')}>
            <Txt v="body14Medium" style={{ lineHeight: undefined }}>영어로는?</Txt>
            <AiBadge />
          </Pressable>
          <View style={styles.divider} />
          <Pressable accessibilityRole="button" style={styles.tool}>
            <Txt v="body14Medium">표현 저장</Txt>
          </Pressable>
          <View style={styles.divider} />
          <Pressable accessibilityRole="button" style={styles.tool} onPress={() => router.push('/write/maya')}>
            <Txt v="strong14">답장에 쓰기</Txt>
          </Pressable>
        </View>
        <Button label="이어 쓰기" icon={img.penWrite} onPress={() => router.push('/write/maya')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },
  envelope: { position: 'absolute', right: -40, top: 3, width: 300, height: 216 },
  sheetWrap: { marginTop: 66, minHeight: 560 },
  inner: { paddingHorizontal: 32, paddingTop: 58, paddingBottom: 48, gap: 16 },
  stamp: { position: 'absolute', left: 278, top: 16, width: 52, height: 70, transform: [{ rotate: '-3deg' }] },
  postmark: { position: 'absolute', left: 206, top: 56, width: 128, height: 53, opacity: 0.9 },
  postmarkText: { position: 'absolute', left: 229, top: 75, width: 46 },
  headRule: { height: 1, backgroundColor: colors.lineStrong },
  newCountry: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  quote: { borderWidth: 1, borderStyle: 'dashed', borderColor: colors.lineStrong, backgroundColor: colors.paper, paddingHorizontal: 12, paddingVertical: 8, gap: 4 },
  selected: { backgroundColor: colors.olive, color: colors.light },
  bottom: { paddingHorizontal: 20, paddingBottom: 18, gap: 8 },
  tools: { height: 48, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.ink },
  tool: { flex: 1, height: 48, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
  divider: { width: 1, height: 24, backgroundColor: colors.line },
});
