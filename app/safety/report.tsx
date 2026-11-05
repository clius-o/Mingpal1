// SF01 신고 — Figma 269:2518. 신고한 편지는 바로 접히고, 상대에게는 알리지 않는다.
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, FooterActions, Note, PageHeader, RadioRow, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const REASONS = ['연애·성적인 접근', '밍팔 밖으로 연락 유도', '돈 이야기', '욕설·괴롭힘', '기타'];

export default function Report() {
  // Figma shows the second reason selected.
  const [reason, setReason] = useState(REASONS[1]);
  return (
    <Screen>
      <PageHeader title="이 편지 신고하기" />
      <View style={{ flex: 1, paddingHorizontal: layout.screenPadding, paddingTop: 18 }}>
        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, padding: 13, gap: 6 }}>
          <Txt v="meta12Strong" color="sub">Lukas · 11월 3일 첫 편지</Txt>
          <Txt v="news16" color="ink2" style={{ fontSize: 15, lineHeight: 21 }}>Hallo Jiyun! I saw your bakery story. In Hamburg we have a bread called…</Txt>
        </View>
        <Txt v="strong14" style={{ marginTop: 24, marginBottom: 8, fontSize: 13 }}>어떤 문제인가요?</Txt>
        {REASONS.map((r) => (
          <RadioRow key={r} label={r} selected={reason === r} onPress={() => setReason(r)} />
        ))}
        <Note>신고한 편지는 바로 접혀요. 이 편지와 최소한의 정보만 운영팀에 전달되고, 사람이 확인해요. 상대에게는 알리지 않아요.</Note>
        <View style={{ flex: 1 }} />
      </View>
      <FooterActions>
        <View style={{ flex: 1 }}><Button label="신고하기" onPress={() => router.replace('/safety/block')} /></View>
      </FooterActions>
    </Screen>
  );
}
