// FD01 친구 찾기 — Figma 269:2190. 장면(한 줄)을 보고 첫 편지를 쓸 친구를 고른다.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { Icon, Rule, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { findCandidates } from '../../src/data/mock';
import { colors, layout } from '../../src/theme';

export default function FindFriends() {
  return (
    <Screen bottomInset={false}>
      <ScrollView contentContainerStyle={{ paddingTop: 46, paddingHorizontal: layout.screenPadding, paddingBottom: layout.tabBarHeight + 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <Txt v="title">친구 찾기</Txt>
          <Pressable accessibilityRole="button" style={{ minHeight: 44, justifyContent: 'center' }} onPress={() => router.push('/find/filters')}>
            <View style={{ height: 36, paddingHorizontal: 14, justifyContent: 'center', backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}>
              <Txt v="body14Medium" style={{ fontSize: 13, lineHeight: 18 }}>조건</Txt>
            </View>
          </Pressable>
        </View>
        <Rule />
        <Txt v="caption13" color="sub" style={{ marginTop: 14 }}>아직 답장이 없는 첫 편지 1통 · 2통 더 보낼 수 있어요</Txt>
        <Pressable accessibilityRole="button" onPress={() => router.push('/onboarding/scene')} style={{ marginTop: 12, minHeight: 44, flexDirection: 'row', alignItems: 'center', paddingLeft: 11, paddingRight: 4, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}>
          <Txt v="body14Medium" style={{ flex: 1, fontSize: 13, lineHeight: 18 }}>내 장면을 쓰면 친구들에게 보여요 · 쓰기 ›</Txt>
          <Icon source={img.chevron} style={{ transform: [{ rotate: '180deg' }] }} />
        </Pressable>
        {findCandidates.map((c) => (
          <Pressable key={c.id} accessibilityRole="button" onPress={() => router.push({ pathname: '/profile/[id]', params: { id: c.id } })} style={{ paddingTop: 22, paddingBottom: 26, gap: 12, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Txt v={c.english ? 'news20' : 'maru16'} style={{ fontSize: 17, lineHeight: 26 }}>{c.quote}</Txt>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Image source={c.avatar} style={{ width: 36, height: 36 }} contentFit="contain" />
              <View>
                <Txt v="name" style={{ fontSize: 18, lineHeight: 24 }}>{c.name}</Txt>
                <Txt v="caption13" color="sub" style={{ lineHeight: 16 }}>{c.where}</Txt>
              </View>
            </View>
            <Txt v="body14Medium" color="ink2" style={{ fontSize: 13, lineHeight: 16 }}>{c.tags}</Txt>
          </Pressable>
        ))}
      </ScrollView>
    </Screen>
  );
}
