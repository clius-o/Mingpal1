// LT01 편지 읽기 (v3 · C안 "읽기 도구 줄") — Figma 284:5833
// One screen renders every variant (받은 첫 편지·돈 이야기 안내·영어 편지·신고한 편지·영어 UI) from src/data/letters.ts.
// Figma positions the sheet art absolutely; here the letter flows inside the sheet so large text / long letters work.
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { img } from '../../src/assets';
import { AiBadge, BackBar, Button, Screen } from '../../src/components/primitives';
import { ClipBack, ClipFront } from '../../src/components/PaperClip';
import { Txt } from '../../src/components/Txt';
import { getLetter, type LetterModel } from '../../src/data/letters';
import { useLocale } from '../../src/i18n';
import { colors } from '../../src/theme';

export default function ReadLetter() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { lang } = useLocale();
  const letterId = id ?? 'maya-4';
  // key remounts the view so per-letter state (selection, fold) resets when the letter or UI language changes
  return <LetterView key={`${letterId}-${lang}`} letter={getLetter(letterId, lang)} />;
}

function LetterView({ letter }: { letter: LetterModel }) {
  const { lang, t } = useLocale();
  // Selected sentence(s) get the olive highlight; tools act on the selection (spec §4.3, §13: tap-select is the long-press alternative).
  const [selected, setSelected] = useState<number | null>(letter.selected ?? null);
  const [folded, setFolded] = useState(Boolean(letter.reported));
  // Korean UI + English letter → "뜻 보기"; otherwise the sentence is translated ("영어로는?" / English UI "Say it in Korean").
  const meaningMode = lang === 'ko' && letter.bodyEnglish;

  return (
    <Screen>
      <BackBar showMore />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={img.envelope} style={styles.envelope} contentFit="contain" accessibilityElementsHidden />
        <View style={styles.sheetWrap}>
          <ClipBack />
          <Image source={img.sheet} style={StyleSheet.absoluteFill} contentFit="fill" />
          <ClipFront />
          <Image source={img.stampOliveLetter} style={styles.stamp} contentFit="contain" />
          <Image source={img.postmark} style={styles.postmark} contentFit="cover" />
          <View style={styles.postmarkText}>
            <Txt v="news14" color="sub" style={{ fontSize: 11, textAlign: 'center', lineHeight: 12 }}>4 NOV</Txt>
            <Txt v="news14" color="sub" style={{ fontSize: 11, textAlign: 'center', lineHeight: 12 }}>2026</Txt>
          </View>

          <View style={styles.inner}>
            <View style={{ gap: 4 }}>
              <Txt v="name">{letter.from}</Txt>
              <Txt v="meta12" color="sub" style={{ lineHeight: 18 }}>{letter.dateLong}</Txt>
              <Txt v="caption13" color="ink2">{letter.place}</Txt>
            </View>
            <View style={styles.headRule} />

            {letter.notice?.kind === 'stamp' ? (
              <View style={styles.newCountry}>
                <Image source={img.stampPortugal} style={{ width: 16, height: 20 }} contentFit="cover" />
                <Txt v="caption13">{letter.notice.text}</Txt>
              </View>
            ) : null}
            {letter.notice?.kind === 'warn' ? (
              <View style={styles.newCountry}>
                <Txt v="caption13">{`${letter.notice.text} · `}</Txt>
                <Pressable accessibilityRole="button" style={styles.warnAction} onPress={() => router.push('/safety/report')}>
                  <Txt v="strong14" style={{ fontSize: 13, lineHeight: 18 }}>{letter.notice.action}</Txt>
                </Pressable>
              </View>
            ) : null}

            {letter.quote && !folded ? (
              <View style={styles.quote}>
                <Txt v="meta12" color="sub">{letter.quote.label}</Txt>
                <Txt v={letter.quote.english ? 'news16Loose' : 'body14'} color="ink2" style={{ lineHeight: 21 }}>{letter.quote.text}</Txt>
              </View>
            ) : null}

            {folded ? (
              <Pressable accessibilityRole="button" onPress={() => setFolded(false)} style={styles.folded}>
                <Txt v="strong16">{letter.reported}</Txt>
              </Pressable>
            ) : (
              <View>
                {letter.body.map((line, i) => (
                  <Pressable
                    key={i}
                    accessibilityRole="button"
                    accessibilityLabel={`${lang === 'en' ? 'Open sentence menu' : '문장 메뉴 열기'}: ${line}`}
                    onPress={() => setSelected(selected === i ? null : i)}
                    onLongPress={() => setSelected(i)}
                  >
                    <Txt
                      v={letter.bodyEnglish ? 'news16Loose' : 'body16'}
                      style={[letter.bodyEnglish ? { fontSize: letter.bodySize ?? 17, lineHeight: 28 } : null, selected === i ? styles.selected : null, { marginBottom: 11 }]}
                    >
                      {line}
                    </Txt>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        {letter.skip ? (
          <Pressable accessibilityRole="button" style={styles.skip} onPress={() => router.back()}>
            <Txt v="body14Medium">{letter.skip}</Txt>
          </Pressable>
        ) : null}
        <View style={styles.tools}>
          <Pressable accessibilityRole="button" style={styles.tool} onPress={meaningMode ? undefined : () => router.push('/translate')}>
            <Txt v="body14Medium" style={{ lineHeight: undefined }}>{meaningMode ? t('read.meaning') : t('read.translate')}</Txt>
            <AiBadge />
          </Pressable>
          <View style={styles.divider} />
          <Pressable accessibilityRole="button" style={styles.tool}>
            <Txt v="body14Medium">{t('read.save')}</Txt>
          </Pressable>
          <View style={styles.divider} />
          <Pressable accessibilityRole="button" style={styles.tool} onPress={() => router.push('/write/maya')}>
            <Txt v="strong14">{t('read.reply')}</Txt>
          </Pressable>
        </View>
        <Button label={letter.primary} icon={letter.skip ? undefined : img.penWrite} onPress={() => router.push('/write/maya')} />
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
  warnAction: { minHeight: 44, justifyContent: 'center', marginVertical: -14 },
  quote: { borderWidth: 1, borderStyle: 'dashed', borderColor: colors.lineStrong, backgroundColor: colors.paper, paddingHorizontal: 12, paddingVertical: 8, gap: 4 },
  folded: { height: 56, borderRadius: 12, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.card, justifyContent: 'center', paddingHorizontal: 16 },
  selected: { backgroundColor: colors.olive, color: colors.light },
  bottom: { paddingHorizontal: 20, paddingBottom: 18, gap: 8 },
  skip: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  tools: { height: 48, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.ink },
  tool: { flex: 1, height: 48, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
  divider: { width: 1, height: 24, backgroundColor: colors.line },
});
