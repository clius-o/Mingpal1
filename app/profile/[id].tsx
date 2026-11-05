// FD03 친구 소개 (v3) — Figma 284:5957
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BackBar, Button, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { formatKm, inesProfile as p } from '../../src/data/mock';
import { colors } from '../../src/theme';

export default function FriendProfile() {
  return (
    <Screen>
      <BackBar />
      <ScrollView contentContainerStyle={styles.content}>
        <Txt v="title">친구 소개</Txt>
        <View style={styles.profile}>
          {/* avatar placeholder until the avatar set ships (initial letter) */}
          <View style={styles.avatar}><Txt v="maru18" color="sub">I</Txt></View>
          <View style={{ gap: 4 }}>
            <Txt v="name">{p.name}</Txt>
            <Txt v="body14Tight" color="sub" style={{ lineHeight: 16 }}>{p.city}, {formatKm(p.distanceKm).replace('km', '')}km 떨어진 곳에서</Txt>
          </View>
        </View>

        <View style={{ gap: 4 }}>
          <InfoRow k="모국어" v={p.native} />
          <InfoRow k="배우는 중" v={p.learning} />
          <InfoRow k="잘하는 언어" v={p.fluent} />
        </View>

        <View style={styles.scene}>
          <Txt v="meta12" color="olive">오늘의 한 장면</Txt>
          <Txt v="body16">{p.scene}</Txt>
          <Pressable accessibilityRole="button" style={styles.sceneCta} onPress={() => router.push('/write/ines')}>
            <Txt v="strong14">이 이야기로 편지 쓰기 →</Txt>
          </Pressable>
        </View>

        <View style={styles.mode}>
          <Txt v="body14" style={{ fontFamily: 'Pretendard-SemiBold' }}>{p.mode}</Txt>
          <Txt v="body14" color="ink2" style={{ lineHeight: 20 }}>{p.modeDesc}</Txt>
        </View>
        <Txt v="body14" color="ink2">{p.interests}</Txt>
        <Txt v="meta12" color="sub">{p.taste}</Txt>
      </ScrollView>
      <View style={styles.bottom}>
        <Txt v="caption13" color="sub" style={{ textAlign: 'center', lineHeight: 16 }}>아직 답장이 없는 첫 편지 1통 · 2통 더 보낼 수 있어요</Txt>
        <Button label="첫 편지 쓰기" onPress={() => router.push('/write/ines')} />
      </View>
    </Screen>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12 }}>
      <Txt v="meta12" color="sub" style={{ width: 64 }}>{k}</Txt>
      <Txt v="body14" color="ink2" style={{ flex: 1 }}>{v}</Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 2, paddingHorizontal: 24, paddingBottom: 24, gap: 20 },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.paper2, borderWidth: 1, borderColor: colors.lineStrong, alignItems: 'center', justifyContent: 'center' },
  scene: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.lineStrong, padding: 16, gap: 8 },
  sceneCta: { minHeight: 44, justifyContent: 'center' },
  mode: { borderTopWidth: 1, borderTopColor: colors.lineStrong, paddingTop: 16, gap: 4 },
  bottom: { paddingHorizontal: 24, paddingBottom: 18, gap: 12 },
});
