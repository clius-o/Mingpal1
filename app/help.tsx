// AI01 AI 도움 시트 (v3) — Figma 284:6053. Always marked "AI 도움 · 나만 보여요" (spec §13).
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { img } from '../src/assets';
import { Icon } from '../src/components/primitives';
import { Txt } from '../src/components/Txt';
import { colors } from '../src/theme';

const SUGGESTIONS = [
  { en: 'We made a mess, but that made it even more fun.', ko: '엉망이었던 게 오히려 즐거웠다는 느낌' },
  { en: 'It was messy, but we laughed the whole time.', ko: undefined },
];

export default function HelpSheet() {
  const [tab, setTab] = useState<'find' | 'polish'>('find');
  const [pick, setPick] = useState(0);

  return (
    <View style={styles.root}>
      <Pressable accessibilityLabel="시트 닫기" style={StyleSheet.absoluteFill} onPress={() => router.back()} />
      <View style={styles.sheet}>
        <View style={styles.grabber} />
        <View style={styles.titleRow}>
          <Txt v="maru16">함께 답장 생각하기</Txt>
          <Txt v="meta12" color="olive" style={styles.aiNote}>AI 도움 · 나만 보여요</Txt>
          <Pressable accessibilityRole="button" accessibilityLabel="닫기" style={styles.close} onPress={() => router.back()}>
            <Icon source={img.close} size={22} />
          </Pressable>
        </View>

        <View style={styles.tabs}>
          {([['find', '표현 찾기'], ['polish', '다듬기']] as const).map(([k, label]) => (
            <Pressable key={k} accessibilityRole="tab" accessibilityState={{ selected: tab === k }} style={styles.tab} onPress={() => setTab(k)}>
              <Txt v={tab === k ? 'strong14' : 'body14Tight'} color={tab === k ? 'ink' : 'sub'}>{label}</Txt>
              <View style={[styles.underline, tab === k && { backgroundColor: colors.olive }]} />
            </Pressable>
          ))}
        </View>

        <View style={{ gap: 4 }}>
          <Txt v="body14Medium" color="sub">Maya의 질문</Txt>
          <Txt v="body14" style={{ lineHeight: 21 }}>집처럼 편하게 느끼는 작은 습관이 있어요?</Txt>
        </View>
        <View style={{ gap: 4 }}>
          <Txt v="body14Medium" color="sub">어떤 이야기를 전하고 싶나요?</Txt>
          <Txt v="body14">딸이랑 요리했는데 엉망이었지만 그래서 더 웃겼어.</Txt>
        </View>

        <View style={{ gap: 12 }}>
          <Txt v="body14Medium" color="sub">이렇게 말해 볼 수 있어요</Txt>
          {SUGGESTIONS.map((s, i) => {
            const on = pick === i;
            return (
              <Pressable key={i} accessibilityRole="radio" accessibilityState={{ selected: on }} onPress={() => setPick(i)} style={[styles.option, on && styles.optionOn]}>
                <View style={styles.radioSlot}>
                  <Icon source={on ? img.radioOn : img.radioOff} size={18} />
                  {on ? <Icon source={img.radioOnDot} size={6} style={styles.radioDot} /> : null}
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Txt v="news16">{s.en}</Txt>
                  {s.ko ? <Txt v="body14Tight" color="sub">{s.ko}</Txt> : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.actions}>
          <Pressable accessibilityRole="button" style={styles.undo}>
            <Icon source={img.undo} size={18} />
            <Txt v="body14Medium" color="sub" style={{ lineHeight: 22 }}>다르게 표현하기</Txt>
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable accessibilityRole="button" style={styles.primary} onPress={() => router.back()}>
            <Txt v="strong16" color="light">편지에 넣기</Txt>
          </Pressable>
        </View>
        <Txt v="caption13" color="sub" style={{ lineHeight: 16 }}>편지에는 고른 한 문장만 들어가요 · 오늘 남은 쓰기 도움 9회</Txt>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(34,32,28,0.45)' },
  sheet: { backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: colors.lineMid, paddingTop: 8, paddingHorizontal: 24, paddingBottom: 24, gap: 16, shadowColor: '#332b1a', shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: -6 }, elevation: 8 },
  grabber: { alignSelf: 'center', width: 36, height: 4, borderRadius: 999, backgroundColor: colors.lineMid },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  aiNote: { position: 'absolute', left: 152, top: 24 },
  close: { marginLeft: 'auto', width: 44, height: 44, marginRight: -11, alignItems: 'center', justifyContent: 'center' },
  tabs: { flexDirection: 'row', gap: 20 },
  tab: { minHeight: 44, alignItems: 'center', justifyContent: 'center', gap: 4 },
  underline: { height: 2, width: 28 },
  option: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.lineMid },
  optionOn: { borderWidth: 2, borderColor: colors.olive },
  radioSlot: { width: 18, height: 18 },
  radioDot: { position: 'absolute', left: 6, top: 6 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  undo: { minHeight: 44, flexDirection: 'row', gap: 4, alignItems: 'center', paddingRight: 4 },
  primary: { height: 52, paddingHorizontal: 24, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
});
