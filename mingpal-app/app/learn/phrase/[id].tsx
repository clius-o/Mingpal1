// LR04 표현 상세 — Figma 269:2404. 의미·원래 문장·써 본 편지·메모. 아는 정보만 보여 준다.
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { img } from '../../../src/assets';
import { BackBar, Icon, Rule, Screen } from '../../../src/components/primitives';
import { Txt } from '../../../src/components/Txt';
import { phrases } from '../../../src/data/mock';
import { colors, fonts, layout } from '../../../src/theme';

const Chevron = () => <Icon source={img.chevron} style={{ transform: [{ rotate: '180deg' }] }} />;

export default function PhraseDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = phrases.find((x) => x.id === id) ?? phrases[0];
  const [memo, setMemo] = useState('');
  return (
    <Screen>
      <BackBar />
      <View style={{ flex: 1, paddingHorizontal: layout.screenPadding, paddingTop: 4 }}>
        <Txt v="caption13" color="sub">{p.source.split(' · ')[0]}</Txt>
        <Txt v="titleEn" style={{ fontFamily: fonts.newsMedium, fontSize: 38, lineHeight: 46, marginTop: 6 }}>{p.text}</Txt>
        {p.meaning ? <Txt v="maru16" color="ink2" style={{ fontSize: 17, lineHeight: 24, marginTop: 6 }}>{p.meaning}</Txt> : null}
        <View style={{ marginTop: 18 }}><Rule /></View>
        {p.original ? (
          <View style={{ paddingTop: 18, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Txt v="meta12Strong" color="sub">원래 문장</Txt>
            <Text style={{ marginTop: 8, fontFamily: fonts.newsRegular, fontSize: 20, lineHeight: 30, color: colors.ink }}>
              {p.original.before}
              <Text style={{ textDecorationLine: 'underline' }}>{p.original.hit}</Text>
              {p.original.after}
            </Text>
            <Pressable accessibilityRole="button" style={{ minHeight: 44, flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Txt v="body14Medium" style={{ flex: 1, fontSize: 13, lineHeight: 20 }}>원래 편지 보기</Txt>
              <Chevron />
            </Pressable>
          </View>
        ) : null}
        {p.used && p.usedIn ? (
          <Pressable accessibilityRole="button" style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Txt v="meta12Strong" color="sub">써 본 편지</Txt>
              <View style={{ height: 20, paddingHorizontal: 5, borderWidth: 1, borderColor: colors.red, borderRadius: 3, justifyContent: 'center' }}>
                <Txt v="meta12Medium" color="red" style={{ lineHeight: 14 }}>써 봄</Txt>
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <Txt v="maru16" style={{ flex: 1, fontSize: 15, lineHeight: 22 }}>{p.usedIn}</Txt>
              <Chevron />
            </View>
          </Pressable>
        ) : null}
        <View style={{ paddingTop: 18 }}>
          <Txt v="meta12Strong" color="sub">메모</Txt>
          <TextInput
            accessibilityLabel="메모"
            multiline
            placeholder="메모를 남겨 두세요"
            placeholderTextColor={colors.sub}
            value={memo}
            onChangeText={setMemo}
            textAlignVertical="top"
            style={{ marginTop: 8, height: 84, padding: 13, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, fontFamily: fonts.prRegular, fontSize: 14, lineHeight: 20, color: colors.ink }}
          />
        </View>
        <View style={{ flex: 1 }} />
      </View>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={{ minHeight: 44, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
        <Txt v="body14Medium" color="sub">표현장에서 삭제</Txt>
      </Pressable>
    </Screen>
  );
}
