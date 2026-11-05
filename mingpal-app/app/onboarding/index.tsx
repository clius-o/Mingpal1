// ON01 소개 — Figma 269:1801
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { img } from '../../src/assets';
import { Button, FooterActions, Rule, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { useLocale } from '../../src/i18n';
import { layout } from '../../src/theme';

export default function Intro() {
  const { t } = useLocale();
  return (
    <Screen>
      <View style={{ alignItems: 'flex-end', paddingRight: 20, height: 44 }}>
        <Pressable accessibilityRole="button" style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 4 }} onPress={() => router.replace('/')}>
          <Txt v="body14Medium" color="sub">{t('intro.skip')}</Txt>
        </Pressable>
      </View>
      <View style={{ flex: 1, paddingHorizontal: layout.screenPadding }}>
        <Image source={img.envelope} style={{ alignSelf: 'center', width: 270, height: 261, marginTop: 10 }} contentFit="contain" />
        <Txt v="title" style={{ fontSize: 32, lineHeight: 40, marginTop: 14 }}>{t('intro.title')}</Txt>
        <View style={{ marginTop: 14 }}><Rule /></View>
        <View style={{ marginTop: 18, gap: 10 }}>
          {[t('intro.l1'), t('intro.l2'), t('intro.l3')].map((line) => (
            <Txt key={line} v="maru16" color="ink2" style={{ fontSize: 15, lineHeight: 24 }}>{line}</Txt>
          ))}
        </View>
      </View>
      <FooterActions>
        <View style={{ flex: 1 }}><Button label={t('intro.start')} onPress={() => router.push('/onboarding/signup')} /></View>
      </FooterActions>
      <Pressable accessibilityRole="button" style={{ minHeight: 44, alignItems: 'center', justifyContent: 'center', marginBottom: 6 }} onPress={() => router.push('/onboarding/signup')}>
        <Txt v="body14Medium">{t('intro.have')}</Txt>
      </Pressable>
    </Screen>
  );
}
