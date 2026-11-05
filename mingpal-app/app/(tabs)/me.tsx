// ME01 내 공간 — Figma 269:2888
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { Avatar, Icon, Rule, Screen, SettingsRow } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { layout } from '../../src/theme';

const ROWS = [
  { label: '언어 설정', href: '/settings/language' },
  { label: '편지 설정', value: '새 친구 받는 중', href: '/settings/letters' },
  { label: '알림', href: '/settings/notifications' },
  { label: '차단 목록', href: '/settings/blocked' },
  { label: 'AI 도움 안내', href: '/settings/ai' },
  { label: '밍팔 플러스', value: '베타 무료', href: '/settings/plus' },
  { label: '계정', href: '/settings/account' },
] as const;

export default function Me() {
  return (
    <Screen bottomInset={false}>
      <ScrollView contentContainerStyle={{ paddingTop: 46, paddingHorizontal: layout.screenPadding, paddingBottom: layout.tabBarHeight + 24 }}>
        <Txt v="title" style={{ marginBottom: 14 }}>내 공간</Txt>
        <Rule />
        <Pressable accessibilityRole="button" style={{ flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#cfc8b8' }} onPress={() => router.push('/settings/profile')}>
          <Avatar source={img.avatarJiyoon} size={64} bg="transparent" />
          <View style={{ flex: 1, gap: 2 }}>
            <Txt v="name" style={{ fontSize: 24, lineHeight: 30 }}>지윤</Txt>
            <Txt v="meta12" color="sub">서울 · 영어 배우는 중(일상 이야기)</Txt>
          </View>
          <Icon source={img.chevron} style={{ transform: [{ rotate: '180deg' }] }} />
        </Pressable>
        {ROWS.map((r) => (
          <SettingsRow key={r.label} label={r.label} value={'value' in r ? r.value : undefined} onPress={() => router.push(r.href)} />
        ))}
      </ScrollView>
    </Screen>
  );
}
