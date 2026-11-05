// LR02 오늘의 복습 — Figma 269:2297 (앞면) / 269:2317 (뒷면). 점수 없음, '다시 볼래요'는 며칠 뒤 다시 나온다.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AiBadge, BackBar, Button, FooterActions, Screen, SecondaryButton } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { reviewDeck } from '../../src/data/mock';
import { colors, fonts, layout, type } from '../../src/theme';

export default function Review() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = reviewDeck[index];
  const next = () => {
    if (index + 1 >= reviewDeck.length) {
      router.back();
      return;
    }
    setIndex(index + 1);
    setFlipped(false);
  };
  return (
    <Screen>
      <View>
        <BackBar />
        <Txt v="body14Medium" color="sub" style={{ position: 'absolute', left: 0, right: 0, top: 10, textAlign: 'center', lineHeight: 24 }} accessibilityLabel={`${reviewDeck.length}장 중 ${index + 1}번째`}>
          {`${index + 1} / ${reviewDeck.length}`}
        </Txt>
      </View>
      <View style={{ flex: 1, paddingHorizontal: layout.screenPadding, paddingTop: 20 }}>
        <Pressable accessibilityRole="button" accessibilityLabel={flipped ? '앞면 보기' : '카드 뒤집기'} onPress={() => setFlipped((f) => !f)} style={{ height: 420, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, padding: 19 }}>
          {/* AI-made content is always marked (spec §13). */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <AiBadge />
            <Txt v="meta12" color="sub">{card.source}</Txt>
          </View>
          <Txt v="body14Medium" color="sub" style={{ marginTop: 52, lineHeight: 20 }}>{flipped ? '뒷면' : card.ask}</Txt>
          {flipped ? (
            <>
              <Text style={{ marginTop: 16, fontFamily: fonts.newsMedium, fontSize: 28, lineHeight: 40, color: colors.ink }}>
                {card.answer.before}
                <Text style={{ textDecorationLine: 'underline' }}>{card.answer.hit}</Text>
                {card.answer.after}
              </Text>
              <Txt v="body14" color="ink2" style={{ marginTop: 34 }}>{card.explain}</Txt>
              <Txt v="caption13" color="sub" style={{ position: 'absolute', left: 19, right: 19, bottom: 49, lineHeight: 20 }}>다음 편지에 써 보면 ‘써 본 표현’이 돼요.</Txt>
            </>
          ) : (
            <>
              <Text style={[type.title, { marginTop: 16, fontSize: 26, lineHeight: 38, color: colors.ink }]}>{card.ko}</Text>
              <Txt v="caption13" color="sub" style={{ position: 'absolute', left: 19, right: 19, bottom: 49, lineHeight: 20 }}>{`처음 쓴 문장: ${card.firstAttempt}`}</Txt>
            </>
          )}
        </Pressable>
        {flipped ? null : <Txt v="caption13" color="sub" style={{ textAlign: 'center', marginTop: 16, lineHeight: 20 }}>떠올려 본 뒤 카드를 눌러 보세요.</Txt>}
        <Txt v="caption13" color="sub" style={{ textAlign: 'center', marginTop: flipped ? 28 : 8 }}>점수는 없어요. ‘다시 볼래요’는 며칠 뒤에 다시 나와요.</Txt>
      </View>
      <FooterActions>
        <SecondaryButton label="다시 볼래요" style={{ flex: 1 }} onPress={next} />
        <View style={{ flex: 1 }}><Button label="기억했어요" onPress={next} /></View>
      </FooterActions>
    </Screen>
  );
}
