// AI03 나만 보는 첨삭 (v3) — Figma 284:6125. Visible only to me; nothing is sent to the friend (spec §12).
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { img } from '../src/assets';
import { Icon, Rule, Screen } from '../src/components/primitives';
import { Txt } from '../src/components/Txt';
import { colors, fonts } from '../src/theme';

const NEW_EXPRESSIONS = ['made a mess', 'feel at home', 'take the long way'];

export default function Review() {
  return (
    <Screen>
      <View style={styles.closeRow}>
        <Pressable accessibilityRole="button" accessibilityLabel="닫기" style={styles.close} onPress={() => router.dismissAll()}>
          <Icon source={img.close} size={22} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={{ gap: 4 }}>
          <Txt v="meta12" color="olive">AI · 나만 볼 수 있어요</Txt>
          <Txt v="title">나만 보는 첨삭</Txt>
          <Txt v="meta12" color="sub">방금 Maya에게 보낸 편지 · Maya에게는 보이지 않아요</Txt>
        </View>
        <Rule thickness={1} />

        <View style={{ gap: 8 }}>
          <Txt v="meta12" color="sub">이번 편지 · 영어 214단어 · 새 표현 3개</Txt>
          <Txt v="body16" style={{ lineHeight: 22 }}>
            <Txt v="news16" color="olive" style={{ lineHeight: 22 }}>take the long way</Txt>를 처음으로 편지에 썼어요
          </Txt>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
            {NEW_EXPRESSIONS.map((e) => (
              <View key={e} style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
                <Txt v="news14" style={{ lineHeight: 18 }}>{e}</Txt>
              </View>
            ))}
          </View>
        </View>

        <View style={{ gap: 4 }}>
          <Txt v="strong14" style={{ lineHeight: 16 }}>자연스럽게 쓴 표현</Txt>
          <Txt v="news20">“My mother doesn't measure anything.”</Txt>
          <Txt v="body14" color="ink2">짧고 생생해요. 원어민도 이렇게 말해요.</Txt>
        </View>

        <View style={styles.fix}>
          <Txt v="strong14" style={{ lineHeight: 16 }}>이렇게 쓰면 더 자연스러워요</Txt>
          <Txt v="news16Loose" color="sub">We made kimchi with whole family.</Txt>
          <Txt v="news16Loose" style={{ fontFamily: fonts.newsRegular }}>
            We made kimchi with <Txt v="news16Loose" color="olive">the whole family</Txt>.
          </Txt>
          <Txt v="body14" color="ink2">‘whole family’ 앞에는 the가 필요해요.</Txt>
          <View style={{ alignItems: 'flex-end' }}>
            <Pressable accessibilityRole="button" style={styles.save}><Txt v="strong14">표현장에 저장</Txt></Pressable>
          </View>
        </View>

        <View style={styles.more}>
          <Txt v="strong14">고칠 곳 2개 더</Txt>
          <Txt v="meta12" color="sub">밍팔 플러스에서 모두 볼 수 있어요</Txt>
        </View>

        <Txt v="body14" color="ink2">보낸 편지는 그대로예요. 다음 편지에 써 보세요.</Txt>
      </ScrollView>
      <View style={styles.bottom}>
        <Pressable accessibilityRole="button" style={styles.cta} onPress={() => router.dismissAll()}>
          <Txt v="strong15" color="light">Maya와의 편지로</Txt>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  closeRow: { height: 44, alignItems: 'flex-end', justifyContent: 'center', paddingRight: 12 },
  close: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  content: { paddingTop: 6, paddingHorizontal: 24, paddingBottom: 24, gap: 20 },
  fix: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.lineMid, padding: 16, gap: 8 },
  save: { height: 44, paddingHorizontal: 16, justifyContent: 'center' },
  more: { borderBottomWidth: 1, borderBottomColor: colors.lineSoft, padding: 12, gap: 4 },
  bottom: { paddingHorizontal: 24, paddingBottom: 18 },
  cta: { height: 52, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center', padding: 16 },
});
