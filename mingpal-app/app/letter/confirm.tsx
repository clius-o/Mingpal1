// LT03 보내기 전 확인 — Figma 269:1552 / 영어 UI 279:3854 / 전송 실패 277:3555 / 결과 불명 277:3606.
// 보낸 편지는 취소하거나 고칠 수 없다. 전송 상태가 불명확하면 자동으로 다시 보내지 않는다.
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { img } from '../../src/assets';
import { BackBar, Button, Screen, SecondaryButton } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { getSendPreview } from '../../src/data/letters';
import { useLocale } from '../../src/i18n';
import { colors } from '../../src/theme';

type SendState = 'ready' | 'failed' | 'unknown';

export default function ConfirmSend() {
  const { state } = useLocalSearchParams<{ state?: SendState }>();
  const status: SendState = state === 'failed' || state === 'unknown' ? state : 'ready';
  const { lang, t } = useLocale();
  const preview = getSendPreview(lang);
  const send = () => router.replace('/letter/sent');

  return (
    <Screen>
      <View>
        <BackBar />
        <Txt v="strong15" style={{ position: 'absolute', left: 56, top: 12, lineHeight: 20 }}>{t('confirm.title')}</Txt>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={img.envelope} style={styles.envelope} contentFit="contain" accessibilityElementsHidden />
        <View style={styles.sheetWrap}>
          <Image source={img.sheet} style={StyleSheet.absoluteFill} contentFit="fill" />
          <Image source={img.stampSeoul} style={styles.stamp} contentFit="cover" />
          <View style={styles.inner}>
            <View style={{ gap: 4 }}>
              <Txt v="name">{preview.to}</Txt>
              <Txt v="caption13" color="sub">{preview.place}</Txt>
            </View>
            <View style={styles.headRule} />
            <View style={{ gap: 11, marginTop: 4 }}>
              {preview.body.map((p, i) => (
                <Txt key={i} v={preview.english ? 'news16Loose' : 'body16'} style={preview.english ? { fontSize: 17, lineHeight: 27 } : { lineHeight: 27 }}>{p}</Txt>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {status === 'ready' ? (
        <Txt v="caption13" color="ink2" style={{ textAlign: 'center', marginBottom: 8 }}>{t('confirm.note')}</Txt>
      ) : (
        <View style={styles.statusCard} accessibilityRole="alert">
          <Txt v="strong15">{status === 'failed' ? t('confirm.failTitle') : t('confirm.unknownTitle')}</Txt>
          <Txt v="caption13" color="ink2">{status === 'failed' ? t('confirm.failBody') : t('confirm.unknownBody')}</Txt>
        </View>
      )}

      <View style={styles.bottom}>
        {status === 'failed' ? (
          <>
            <SecondaryButton label={t('confirm.later')} style={{ width: 120 }} onPress={() => router.back()} />
            <View style={{ flex: 1 }}><Button label={t('confirm.retry')} onPress={send} /></View>
          </>
        ) : status === 'unknown' ? (
          <>
            <SecondaryButton label={t('confirm.more')} style={{ width: 120 }} disabled />
            <View style={{ flex: 1 }}><Button label={t('confirm.check')} onPress={send} /></View>
          </>
        ) : (
          <>
            <SecondaryButton label={t('confirm.more')} style={{ width: 120 }} onPress={() => router.back()} />
            <View style={{ flex: 1 }}><Button label={t('confirm.send')} onPress={send} /></View>
          </>
        )}
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
  statusCard: { marginHorizontal: 20, marginBottom: 10, minHeight: 84, justifyContent: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: colors.card, borderWidth: 1.5, borderColor: colors.ink, borderRadius: 12 },
  bottom: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingBottom: 18 },
});
