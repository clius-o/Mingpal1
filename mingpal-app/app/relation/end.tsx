// RL02 편지 마치기 — Figma 269:2464. 상대에게는 "이 편지는 마무리되었어요"만 알리고, 7일 안에는 취소할 수 있다.
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { FieldLabel } from '../../src/components/onboarding';
import { Bullets, Button, FooterActions, Note, Rule, Screen, SecondaryButton, BackBar } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, fonts, layout } from '../../src/theme';

export default function EndLetters() {
  const { name = 'Oliver' } = useLocalSearchParams<{ name?: string }>();
  const [farewell, setFarewell] = useState('');
  return (
    <Screen>
      <BackBar />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingBottom: 16 }}>
        <Txt v="title">{`${name}와의 편지를\n마칠까요?`}</Txt>
        <View style={{ marginTop: 8, marginBottom: 20 }}><Rule /></View>
        <Bullets
          items={[
            '두 사람 모두 새 편지를 보낼 수 없어요',
            '지금까지의 편지는 읽을 수만 있게 남아요',
            `${name}에게는 “이 편지는 마무리되었어요”라고만 알려요`,
            '7일 안에는 종료를 취소할 수 있어요. 그 뒤에는 다시 편지를 보낼 수 없어요',
          ]}
        />
        <View style={{ marginTop: 24 }}>
          <FieldLabel>마지막 인사 (선택)</FieldLabel>
          <TextInput
            accessibilityLabel="마지막 인사"
            multiline
            placeholder="(비워 두어도 돼요)"
            placeholderTextColor={colors.sub}
            value={farewell}
            onChangeText={setFarewell}
            textAlignVertical="top"
            style={{ minHeight: 64, padding: 13, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, fontFamily: fonts.prRegular, fontSize: 15, lineHeight: 22, color: colors.ink }}
          />
        </View>
        <Note>연락을 막으려면 차단, 불편한 일이 있었다면 신고를 이용하세요.</Note>
      </ScrollView>
      <FooterActions>
        <SecondaryButton label="돌아가기" style={{ width: 120 }} onPress={() => router.back()} />
        <View style={{ flex: 1 }}><Button label="편지 마치기" onPress={() => router.replace('/relation/ended')} /></View>
      </FooterActions>
    </Screen>
  );
}
