// MB02 첫 편지 — Figma 269:1979 / 영어 UI 279:3768. 받은 첫 편지는 7일 안에 답장하거나 '정중히 넘기기'를 고를 수 있다.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { Icon, Note, PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { useLocale, type Lang } from '../../src/i18n';
import { colors, layout } from '../../src/theme';

type Row = { id: string; name: string; city: string; date: string; avatar: number; isNew: boolean; text: string; english: boolean };

// Korean UI: Jiyun receives (Lukas, Sofía). English UI: Maya receives (Jiyun, Min-jun).
const ROWS: Record<Lang, Row[]> = {
  ko: [
    { id: 'lukas', name: 'Lukas', city: '함부르크', date: '11월 3일', avatar: img.avatarB1, isNew: true, english: true, text: 'Hallo Jiyun! I saw your bakery story. In Hamburg we have a bread called Franzbrötchen, and I eat one every Sunday…' },
    { id: 'sofia', name: 'Sofía', city: '산티아고', date: '10월 29일', avatar: img.avatarB2, isNew: false, english: true, text: 'Hi! I also love walking without a plan. Last month I found a tiny bookstore…' },
  ],
  en: [
    { id: 'jiyun', name: 'Jiyun', city: 'Seoul', date: 'Nov 3', avatar: img.avatarB1, isNew: true, english: true, text: 'Hi Maya! I read about your rainy walk to the bakery. In Seoul, I walk to a bakery every Sunday too…' },
    { id: 'minjun', name: 'Min-jun', city: 'Busan', date: 'Oct 29', avatar: img.avatarB2, isNew: false, english: true, text: 'Hi! I also love walking without a plan. Last month I found a tiny bookstore…' },
  ],
};

export default function FirstLetters() {
  const { lang, t } = useLocale();
  const [tab, setTab] = useState<'received' | 'sent'>('received');
  const rows = ROWS[lang];
  return (
    <Screen>
      <PageHeader title={t('first.title')} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', gap: 16, borderBottomWidth: 1, borderBottomColor: colors.line, marginTop: 12 }}>
          {([['received', `${t('first.received')} ${rows.filter((r) => r.isNew).length}`], ['sent', t('first.sent')]] as const).map(([k, label]) => (
            <Pressable key={k} accessibilityRole="tab" accessibilityState={{ selected: tab === k }} onPress={() => setTab(k)} style={{ minHeight: 44, justifyContent: 'center', borderBottomWidth: 3, borderBottomColor: tab === k ? colors.ink : 'transparent', marginBottom: -1, paddingRight: 12 }}>
              <Txt v={tab === k ? 'strong15' : 'medium16'} color={tab === k ? 'ink' : 'sub'} style={{ fontSize: 15, lineHeight: 20 }}>{label}</Txt>
            </Pressable>
          ))}
        </View>
        <Txt v="caption13" color="sub" style={{ marginTop: 14, lineHeight: 20 }}>{t('first.note')}</Txt>
        {tab === 'received'
          ? rows.map((l) => (
              <Pressable key={l.id} accessibilityRole="button" onPress={() => router.push({ pathname: '/letter/[id]', params: { id: lang === 'en' ? 'maya-4' : l.isNew ? 'maya-first' : 'maya-4' } })} style={{ flexDirection: 'row', gap: 12, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: colors.line }}>
                <Image source={l.avatar} style={{ width: 48, height: 48 }} contentFit="contain" />
                <View style={{ flex: 1, gap: 4 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                    <Txt v="name">{l.name}</Txt>
                    <Txt v="caption13" color="sub" style={{ flex: 1 }}>{l.city}</Txt>
                    <Txt v="caption13" color="sub">{l.date}</Txt>
                  </View>
                  <Txt v="news16" color="ink2" numberOfLines={2} style={{ fontSize: 15, lineHeight: 21 }}>{l.text}</Txt>
                  {l.isNew ? <Txt v="strong14" color="red" style={{ fontSize: 13, lineHeight: 18, marginTop: 4 }}>{t('first.new')}</Txt> : null}
                </View>
              </Pressable>
            ))
          : null}
        <Pressable accessibilityRole="button" style={{ minHeight: 56, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line, marginTop: 8 }}>
          <Txt v="maru16" style={{ flex: 1, fontSize: 15, lineHeight: 21 }}>{t('first.past')}</Txt>
          <Icon source={img.chevron} style={{ transform: [{ rotate: '180deg' }] }} />
        </Pressable>
        <Note>{t('first.foot')}</Note>
      </ScrollView>
    </Screen>
  );
}
