// LT02 편지 쓰기 (v3) — Figma 284:6014
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { img } from '../../src/assets';
import { AiBadge, BackBar, Button, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, fonts } from '../../src/theme';

export default function WriteLetter() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const to = id === 'ines' ? 'Inés' : 'Maya';
  const [body, setBody] = useState('I loved this part. I also take the long way when I want to think.\nYou asked about a small routine that makes me feel at home.');

  return (
    <Screen>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View>
          <BackBar />
          <Pressable accessibilityRole="button" style={styles.received} onPress={() => router.push(`/letter/${id === 'ines' ? 'maya-4' : 'maya-4'}`)}>
            <Txt v="strong14">받은 편지 보기</Txt>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={{ gap: 4 }}>
            <Txt v="title" style={{ fontFamily: fonts.newsSemiBold }}>
              {to}
              <Txt v="title">에게 답장</Txt>
            </Txt>
            <Txt v="body14Tight" color="sub">교환 편지 · 나는 영어로 · 계정에 저장됨</Txt>
          </View>

          <Pressable accessibilityRole="button" style={styles.topics}>
            <Txt v="body14Tight">이어 쓸 거리 4</Txt>
            <Txt v="body14Tight" color="sub">›</Txt>
          </Pressable>

          <View style={styles.card}>
            <Txt v="body16">Hi {to},</Txt>
            <View style={styles.quote}>
              <Txt v="meta12" color="sub">인용 · {to}가 쓴 문장</Txt>
              <Txt v="body14" color="ink2" style={{ lineHeight: 18 }}>“빵집까지 먼 길로 걸어갔어요.”</Txt>
            </View>
            <TextInput
              value={body}
              onChangeText={setBody}
              multiline
              accessibilityLabel="편지 본문"
              placeholder="여기에 이어서 써 보세요"
              placeholderTextColor={colors.sub}
              selectionColor={colors.olive}
              style={styles.input}
              textAlignVertical="top"
            />
            {/* 내 우표 — spec §12 LT02 */}
            <View style={styles.stamp}>
              <Image source={img.stampSeoul} style={{ width: 36, height: 44 }} contentFit="cover" />
              <Txt v="news14" color="sub" style={{ fontFamily: fonts.newsMedium, fontSize: 9, letterSpacing: 0.72, lineHeight: 12 }}>SEOUL</Txt>
            </View>
          </View>

          <View style={styles.tools}>
            <Pressable accessibilityRole="button" style={styles.tool} onPress={() => router.push('/help')}>
              <Txt v="body14Tight">표현 찾기</Txt><AiBadge />
            </Pressable>
            <View style={styles.divider} />
            <Pressable accessibilityRole="button" style={styles.tool} onPress={() => router.push('/help')}>
              <Txt v="body14Tight">다듬기</Txt><AiBadge />
            </Pressable>
          </View>

          <Button label="보내기 전 확인" onPress={() => router.push('/letter/confirm')} />
        </ScrollView>
        <Image source={img.illPen} style={styles.illPen} contentFit="contain" accessibilityElementsHidden />
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  received: { position: 'absolute', right: 10, top: 0, minHeight: 44, minWidth: 96, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 },
  content: { paddingTop: 2, paddingHorizontal: 24, paddingBottom: 24, gap: 20 },
  topics: { height: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.lineSoft },
  card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.lineMid, padding: 20, gap: 12, minHeight: 406 },
  quote: { backgroundColor: colors.paper, paddingHorizontal: 12, paddingVertical: 8, gap: 4, borderRadius: 2 },
  input: { flex: 1, minHeight: 180, fontFamily: fonts.prRegular, fontSize: 16, lineHeight: 28, color: colors.ink, padding: 0 },
  stamp: { alignSelf: 'flex-end', alignItems: 'flex-start', gap: 2 },
  tools: { height: 48, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.ink },
  tool: { flex: 1, height: 48, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' },
  divider: { width: 1, height: 24, backgroundColor: colors.line },
  illPen: { position: 'absolute', right: 24, top: 40, width: 64, height: 64 },
});
