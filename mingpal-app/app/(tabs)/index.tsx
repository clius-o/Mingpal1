// MB01 우편함 (v3 · A안 "편지 먼저") — Figma 284:5683
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { img } from '../../src/assets';
import { Avatar, Icon, NewBadge, Rule, Screen, ZoneLabel } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { friends, formatKm, type Friend } from '../../src/data/mock';
import { colors } from '../../src/theme';

const FILTERS = ['전체', '첫 편지 1', '초안', '보관'] as const;

export default function Mailbox() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('전체');
  const arrived = friends.find((f) => f.status === 'new');
  const newCount = friends.filter((f) => f.status === 'new').length;

  return (
    <Screen bottomInset={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>
          <View style={{ gap: 4 }}>
            <Txt v="title">우편함</Txt>
            {newCount > 0 ? <Txt v="caption13" color="sub">새 편지 2통이 도착했어요.</Txt> : null}
          </View>
          {/* 내 우표 — decorative, top right */}
          <Image source={img.stampOlive} style={styles.stamp} contentFit="contain" accessibilityElementsHidden />
        </View>
        <Rule />

        {arrived ? (
          <>
            <ZoneLabel>도착한 편지</ZoneLabel>
            <Pressable accessibilityRole="button" style={styles.arrivedCard} onPress={() => router.push(`/letter/maya-4`)}>
              <View style={styles.row12}>
                <Avatar source={arrived.avatar} size={44} bg={arrived.avatarBg} />
                <View style={{ flex: 1 }}>
                  <Txt v="name">{arrived.name}</Txt>
                  <Txt v="caption13" color="sub">{arrived.city} · {formatKm(arrived.distanceKm)}</Txt>
                </View>
                <NewBadge />
              </View>
              <Txt v="body14" numberOfLines={2}>{arrived.preview}</Txt>
              <Txt v="strong14">읽기 →</Txt>
            </Pressable>
          </>
        ) : null}

        <ZoneLabel>이어 쓰는 중</ZoneLabel>
        <Pressable accessibilityRole="button" style={styles.draftRow} onPress={() => router.push('/write/maya')}>
          <Txt v="body14">Maya에게 답장</Txt>
          <Txt v="meta12" color="sub">오늘 23:40</Txt>
        </Pressable>

        <Pressable accessibilityRole="button" style={styles.memoRow}>
          <Icon source={img.pencil} size={18} />
          <Txt v="body14" color="sub">오늘 있었던 일을 한 줄 남겨 두세요</Txt>
        </Pressable>

        <ZoneLabel>친구들</ZoneLabel>
        <View style={styles.filters}>
          {FILTERS.map((f) => (
            <Pressable key={f} accessibilityRole="tab" accessibilityState={{ selected: filter === f }} onPress={() => setFilter(f)} style={styles.filter}>
              <Txt v="body14" color={filter === f ? 'ink' : 'sub'}>{f}</Txt>
            </Pressable>
          ))}
        </View>

        <View>
          {friends.map((f) => <FriendRow key={f.id} friend={f} />)}
          <PostOfficeRow />
        </View>
      </ScrollView>
    </Screen>
  );
}

function FriendRow({ friend }: { friend: Friend }) {
  return (
    <Pressable accessibilityRole="button" style={styles.letterRow} onPress={() => router.push(`/friend/${friend.id}`)}>
      <Avatar source={friend.avatar} size={64} bg={friend.avatarBg} />
      <View style={{ flex: 1, gap: 4 }}>
        <View style={styles.rowBetween}>
          <Txt v="name">{friend.name}</Txt>
          <Txt v="meta12" color="sub">{friend.lastDate}</Txt>
        </View>
        <Txt v="body14" color="ink2" numberOfLines={2}>{friend.preview}</Txt>
      </View>
    </Pressable>
  );
}

function PostOfficeRow() {
  return (
    <View style={styles.letterRow}>
      <View style={{ width: 64, height: 64 }} />
      <View style={{ flex: 1, gap: 4 }}>
        <View style={styles.rowBetween}>
          <Txt v="maru18" style={{ lineHeight: 26 }}>우체국</Txt>
          <Txt v="meta12" color="sub">밍팔 우체국</Txt>
        </View>
        <Txt v="body14" color="ink2">오늘</Txt>
        <Txt v="meta12" color="sub">답장이 늦어도 괜찮아요. 기다리는 동안 해 볼 만한 것들을 적어 보냈어요.</Txt>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 46, paddingHorizontal: 24, paddingBottom: 32, gap: 16 },
  stamp: { position: 'absolute', right: -24, top: -34, width: 62, height: 84, transform: [{ rotate: '-2deg' }] },
  arrivedCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.ink, padding: 16, gap: 10 },
  row12: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowBetween: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  draftRow: { minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.lineSoft },
  memoRow: { minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 8 },
  filters: { flexDirection: 'row', gap: 20 },
  filter: { minHeight: 44, justifyContent: 'center' },
  letterRow: { flexDirection: 'row', gap: 16, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.lineSoft, alignItems: 'flex-start' },
});
