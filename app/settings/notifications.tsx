// ME05 알림 — Figma 269:3077
import { useState } from 'react';
import { View } from 'react-native';
import { Note, PageHeader, RadioRow, Screen, SectionLabel, SettingsRow, ToggleRow } from '../../src/components/primitives';
import { layout } from '../../src/theme';

export default function Notifications() {
  const [mode, setMode] = useState<'now' | 'daily'>('now');
  const [review, setReview] = useState(false);
  const [draft, setDraft] = useState(true);
  const [time, setTime] = useState(true);
  const [anniv, setAnniv] = useState(true);
  return (
    <Screen>
      <PageHeader title="알림" />
      <View style={{ paddingHorizontal: layout.screenPadding }}>
        <SectionLabel>편지 도착 알림</SectionLabel>
        <RadioRow label="바로 받기" selected={mode === 'now'} onPress={() => setMode('now')} />
        <RadioRow label="하루 한 번 모아서" value="저녁 8시" selected={mode === 'daily'} onPress={() => setMode('daily')} />
        <SectionLabel>다른 알림</SectionLabel>
        <ToggleRow label="오늘의 복습" value={review} onValueChange={setReview} />
        <ToggleRow label="쓰던 편지" value={draft} onValueChange={setDraft} />
        <ToggleRow label="편지 쓰는 시간" value={time} onValueChange={setTime} />
        <ToggleRow label="기념일" value={anniv} onValueChange={setAnniv} />
        <SettingsRow label="방해 금지 시간" value="밤 10시 ~ 아침 8시" />
        <Note>알림에는 편지 내용이 보이지 않아요. 답장을 재촉하는 알림은 보내지 않아요.</Note>
      </View>
    </Screen>
  );
}
