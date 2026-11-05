// LR01 배움 홈 (v3) — Figma 284:6167
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Pressable } from 'react-native';
import { AiBadge, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { recentExpressions, type Expression } from '../../src/data/mock';
import { colors } from '../../src/theme';

export default function LearnHome() {
  return (
    <Screen bottomInset={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Txt v="title">배움</Txt>

        <Pressable accessibilityRole="button" style={styles.review} onPress={() => router.push('/learn/review')}>
          <View style={{ flex: 1, gap: 4 }}>
            <Txt v="maru18" color="light">오늘의 복습</Txt>
            <Txt v="caption13" color="light" style={{ lineHeight: 16 }}>5장 · 약 2분</Txt>
          </View>
          <Txt v="strong14" color="light">시작 →</Txt>
        </Pressable>

        <Pressable accessibilityRole="button" style={styles.usedRow} onPress={() => router.push({ pathname: '/learn/phrases', params: { filter: 'used' } })}>
          <View style={styles.stampCircle}><Txt v="meta12Strong" color="olive">써 봄</Txt></View>
          <View style={{ flex: 1, gap: 4 }}>
            <Txt v="strong16">써 본 표현 9개</Txt>
            <Txt v="caption13" color="sub">저장한 32개 중 편지에 써 본 표현</Txt>
          </View>
          <Txt v="body14" color="sub" style={{ fontSize: 20 }}>›</Txt>
        </Pressable>

        <View style={{ gap: 12 }}>
          <View style={styles.zoneHead}>
            <Txt v="strong14">최근 표현</Txt>
            <Pressable accessibilityRole="button" style={styles.moreTouch} onPress={() => router.push('/learn/phrases')}><Txt v="meta12" color="sub">표현장 전체 ›</Txt></Pressable>
          </View>
          <View>{recentExpressions.map((e) => <ExpressionRow key={e.id} e={e} />)}</View>
        </View>

        <View style={{ gap: 12 }}>
          <View style={styles.zoneHead}><Txt v="strong14">11월</Txt></View>
          <Txt v="caption13">보낸 편지 2 · 쓴 단어 400 · 새 표현 5</Txt>
          <Txt v="caption13" color="sub">이번 달 편지가 18,500km를 날았어요</Txt>
        </View>

        <Pressable accessibilityRole="button" style={styles.question}>
          <View style={{ flex: 1, gap: 4 }}>
            <Txt v="meta12" color="olive">이번 주의 질문 · 밍팔 우체국</Txt>
            <Txt v="medium16">당신 동네의 가을 음식은 무엇인가요?</Txt>
          </View>
          <Txt v="body14" color="sub" style={{ fontSize: 20 }}>›</Txt>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

function ExpressionRow({ e }: { e: Expression }) {
  return (
    <View style={styles.expr}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Txt v="news16Loose">{e.text}</Txt>
        {e.used ? <View style={styles.usedTag}><Txt v="meta12Medium" color="red">써 봄</Txt></View> : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {e.sourceKind === 'ai' ? <AiBadge /> : null}
        {e.sourceKind === 'en' ? <View style={styles.srcTag}><Txt v="meta12" color="sub">영어로는?</Txt></View> : null}
        <Txt v={e.sourceKind === 'letter' ? 'caption13' : 'meta12'} color="sub">{e.source}</Txt>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 46, paddingHorizontal: 24, paddingBottom: 32, gap: 24 },
  review: { backgroundColor: colors.ink, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 12 },
  usedRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.lineSoft },
  stampCircle: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: colors.olive, alignItems: 'center', justifyContent: 'center' },
  zoneHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.ink, paddingBottom: 4 },
  moreTouch: { minHeight: 44, justifyContent: 'center', marginVertical: -14 },
  expr: { paddingVertical: 16, gap: 4, borderBottomWidth: 1, borderBottomColor: colors.lineMid },
  usedTag: { height: 20, paddingHorizontal: 4, borderWidth: 1, borderColor: colors.red, borderRadius: 3, justifyContent: 'center' },
  srcTag: { height: 20, paddingHorizontal: 4, borderWidth: 1, borderColor: colors.sub, borderRadius: 3, justifyContent: 'center' },
  question: { borderTopWidth: 1, borderTopColor: colors.lineStrong, paddingTop: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
});
