// ME02 프로필 수정 — Figma 269:2960
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { View } from 'react-native';
import { img } from '../../src/assets';
import { Screen, PageHeader, SectionLabel, SettingsRow } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const ROWS = [
  { label: '아바타', value: '7번' },
  { label: '우표 그림', value: '기본 · 3개 열림', href: '/stamps' },
  { label: '닉네임', value: '지윤' },
  { label: '나라·도시', value: '대한민국 · 서울' },
  { label: '오늘의 한 장면', value: 'Every Sunday morning…' },
  { label: '관심사', value: '요리, 빵집 탐방, 산책' },
  { label: '편지 취향', value: '여유 있게 · 일주일쯤' },
] as const;

export default function ProfileEdit() {
  return (
    <Screen>
      <PageHeader title="프로필 수정" action="저장" onAction={() => router.back()} />
      <View style={{ paddingHorizontal: layout.screenPadding }}>
        <SectionLabel>친구에게 이렇게 보여요</SectionLabel>
        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, padding: 15, gap: 16, marginBottom: 20 }}>
          <Txt v="news16Loose" style={{ lineHeight: 24 }}>“Every Sunday morning, I walk to a bakery I’ve never been to and pick just one bread.”</Txt>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Image source={img.avatarJiyoon} style={{ width: 36, height: 36 }} contentFit="contain" />
            <View>
              <Txt v="name" style={{ fontSize: 17, lineHeight: 22 }}>지윤</Txt>
              <Txt v="meta12" color="sub">서울</Txt>
            </View>
          </View>
        </View>
        {ROWS.map((r) => (
          <SettingsRow key={r.label} label={r.label} value={r.value} />
        ))}
      </View>
    </Screen>
  );
}
