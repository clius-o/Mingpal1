// AI02 영어로는 어떻게 말할까? — Figma 269:1670. 편지 읽기 위의 읽기 도움 시트. AI 결과는 늘 표시하고 나만 보인다(§13).
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '../src/components/primitives';
import { Sheet } from '../src/components/Sheet';
import { Txt } from '../src/components/Txt';
import { colors, fonts } from '../src/theme';

export default function Translate() {
  return (
    <Sheet title="영어로는 어떻게 말할까?" aiNote="AI · 나만 보여요" surface="#fbfaf6">
      <View style={{ gap: 4 }}>
        <Txt v="caption13" color="sub">Maya가 쓴 문장</Txt>
        <Txt v="body14" style={{ fontSize: 15, lineHeight: 22 }}>빵집까지 먼 길로 걸어갔어요.</Txt>
      </View>
      <View style={{ gap: 4 }}>
        <Txt v="caption13" color="sub">영어로는</Txt>
        <Text style={{ fontFamily: fonts.newsRegular, fontSize: 20, lineHeight: 28, color: colors.ink }}>
          {'I '}
          <Text style={{ fontFamily: fonts.newsMedium, textDecorationLine: 'underline' }}>took the long way</Text>
          {' to the bakery.'}
        </Text>
      </View>
      <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 13, paddingVertical: 9, gap: 2 }}>
        <Text style={{ fontFamily: fonts.newsRegular, fontStyle: 'italic', fontSize: 17, lineHeight: 24, color: colors.ink }}>take the long way</Text>
        <Txt v="caption13" color="ink2">일부러 먼 길로 가다. 산책하듯 돌아갈 때 자연스러워요.</Txt>
      </View>
      <Button label="표현장에 저장" onPress={() => router.back()} />
      <Txt v="meta12" color="sub" style={{ textAlign: 'center', lineHeight: 16 }}>읽기 도움은 횟수 제한이 없어요</Txt>
    </Sheet>
  );
}
