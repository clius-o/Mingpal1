// AI02 영어로는 어떻게 말할까? — Figma 269:1670 / 영어 UI 279:3902. 읽기 도움 시트. AI 결과는 늘 표시하고 나만 보인다(§13).
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '../src/components/primitives';
import { Sheet } from '../src/components/Sheet';
import { Txt } from '../src/components/Txt';
import { useLocale } from '../src/i18n';
import { colors, fonts } from '../src/theme';

export default function Translate() {
  const { lang, t } = useLocale();
  // Korean UI: Maya's Korean sentence → English (Newsreader). English UI: Jiyun's English sentence → Korean (Pretendard).
  const toEnglish = lang === 'ko';
  return (
    <Sheet title={t('tr.title')} aiNote={t('tr.ai')} surface="#fbfaf6">
      <View style={{ gap: 4 }}>
        <Txt v="caption13" color="sub">{t('tr.said')}</Txt>
        {toEnglish ? (
          <Txt v="body14" style={{ fontSize: 15, lineHeight: 22 }}>{t('tr.sentence')}</Txt>
        ) : (
          <Text style={{ fontFamily: fonts.newsRegular, fontSize: 15, lineHeight: 22, color: colors.ink }}>{t('tr.sentence')}</Text>
        )}
      </View>
      <View style={{ gap: 4 }}>
        <Txt v="caption13" color="sub">{t('tr.in')}</Txt>
        {toEnglish ? (
          <Text style={{ fontFamily: fonts.newsRegular, fontSize: 20, lineHeight: 28, color: colors.ink }}>
            {t('tr.answerPre')}
            <Text style={{ fontFamily: fonts.newsMedium, textDecorationLine: 'underline' }}>{t('tr.answerHit')}</Text>
            {t('tr.answerPost')}
          </Text>
        ) : (
          <Txt v="body14" style={{ fontSize: 20, lineHeight: 28 }}>{t('tr.answerHit')}</Txt>
        )}
      </View>
      <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 13, paddingVertical: 9, gap: 2 }}>
        {toEnglish ? (
          <Text style={{ fontFamily: fonts.newsRegular, fontStyle: 'italic', fontSize: 17, lineHeight: 24, color: colors.ink }}>{t('tr.phrase')}</Text>
        ) : (
          <Txt v="strong16" style={{ fontSize: 17, lineHeight: 24 }}>{t('tr.phrase')}</Txt>
        )}
        <Txt v="caption13" color="ink2">{t('tr.explain')}</Txt>
      </View>
      <Button label={t('tr.save')} onPress={() => router.back()} />
      <Txt v="meta12" color="sub" style={{ textAlign: 'center', lineHeight: 16 }}>{t('tr.foot')}</Txt>
    </Sheet>
  );
}
