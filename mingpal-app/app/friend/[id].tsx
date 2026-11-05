// MB05 친구별 기록 (v3) — Figma 284:5897
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { img } from '../../src/assets';
import { Avatar, BackBar, Button, Icon, Rule, Screen, ZoneLabel } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { draftReply, formatKm, friends, lettersFromMaya } from '../../src/data/mock';
import { colors } from '../../src/theme';

export default function FriendLog() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const friend = friends.find((f) => f.id === id) ?? friends[0];
  const letters = friend.id === 'maya' ? lettersFromMaya : [];
  const months = [...new Set(letters.map((l) => l.month))];

  return (
    <Screen>
      <BackBar showMore />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.head}>
          <Avatar source={friend.avatar} size={72} bg={friend.avatarBg} />
          <View style={{ flex: 1, gap: 4 }}>
            <Txt v="titleEn">{friend.name}</Txt>
            <Txt v="caption13" color="sub" style={{ lineHeight: 16 }}>{friend.city} · {formatKm(friend.distanceKm)} · 교환 편지</Txt>
            <Pressable accessibilityRole="button" style={styles.introTouch} onPress={() => router.push(`/profile/${friend.id}`)}>
              <Txt v="meta12Strong">소개 보기 ›</Txt>
            </Pressable>
          </View>
        </View>
        <Rule />

        <View style={styles.summary}>
          <View style={styles.postmark}><Txt v="meta12Strong" color="sub">4통</Txt></View>
          <View style={{ flex: 1, gap: 4 }}>
            <Txt v="strong16" style={{ lineHeight: 20 }}>{friend.name}와 편지 4통</Txt>
            <Txt v="caption13" color="sub">2026년 8월부터 · 편지가 41,600km를 날았어요</Txt>
          </View>
        </View>

        <ZoneLabel>이어 쓰는 중</ZoneLabel>
        <Pressable accessibilityRole="button" style={styles.draft} onPress={() => router.push(`/write/${friend.id}`)}>
          <View style={styles.draftHead}>
            <Icon source={img.pen} size={16} />
            <Txt v="strong14">쓰던 답장</Txt>
            <View style={{ flex: 1 }} />
            <Txt v="meta12" color="sub">계정에 저장됨</Txt>
          </View>
          <Txt v="body14" color="ink2" numberOfLines={1}>{draftReply}</Txt>
        </Pressable>

        <ZoneLabel>편지 기록</ZoneLabel>
        <View>
          {months.map((m) => (
            <View key={m}>
              <ZoneLabel>{m}</ZoneLabel>
              {letters.filter((l) => l.month === m).map((l) => (
                <Pressable key={l.id} accessibilityRole="button" style={styles.logRow} onPress={() => router.push(`/letter/${l.id}`)}>
                  <View style={styles.logHead}>
                    <Txt v="name">{friend.name}</Txt>
                    {l.isNew ? <Txt v="meta12" color="red">● 새 편지</Txt> : null}
                    <View style={{ flex: 1 }} />
                    {l.count ? (
                      <View style={styles.countLabel}>
                        <Icon source={img.dotNew} size={7} />
                        <Txt v="meta12" color="sub">{l.count}통</Txt>
                      </View>
                    ) : null}
                    <Txt v="meta12" color="sub">{l.date}</Txt>
                  </View>
                  <Txt v="body14" color="ink2" numberOfLines={1}>{l.preview}</Txt>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Button label="이어 쓰기" icon={img.penWrite} onPress={() => router.push(`/write/${friend.id}`)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 6, paddingHorizontal: 24, paddingBottom: 24, gap: 20 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  introTouch: { minHeight: 44, justifyContent: 'center', marginVertical: -14 },
  summary: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  postmark: { width: 44, height: 44, borderRadius: 22, borderWidth: 1.5, borderColor: colors.sub, alignItems: 'center', justifyContent: 'center' },
  draft: { paddingVertical: 16, gap: 4, borderBottomWidth: 1, borderBottomColor: colors.lineMid },
  draftHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logRow: { paddingVertical: 16, gap: 4, borderBottomWidth: 1, borderBottomColor: colors.lineMid },
  logHead: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  countLabel: { flexDirection: 'row', alignItems: 'center', gap: 5, height: 16 },
  bottom: { paddingHorizontal: 24, paddingBottom: 18 },
});
