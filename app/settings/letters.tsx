// ME04 편지 설정 — Figma 269:3047
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Note, PageHeader, Screen, SettingsRow, ToggleRow } from '../../src/components/primitives';
import { layout } from '../../src/theme';

export default function LetterSettings() {
  const [open, setOpen] = useState(true);
  const [post, setPost] = useState(true);
  return (
    <Screen>
      <PageHeader title="편지 설정" />
      <View style={{ paddingHorizontal: layout.screenPadding, paddingTop: 16 }}>
        <ToggleRow label="새 친구 받기" desc="끄면 친구 찾기에서 빠지고 새 첫 편지가 오지 않아요. 지금 친구들과는 그대로예요." value={open} onValueChange={setOpen} />
        <SettingsRow label="잠시 쉬기" value="꺼져 있어요" onPress={() => router.push('/rest')} />
        <SettingsRow label="편지 쓰는 시간" value="일요일 저녁" />
        <ToggleRow label="밍팔 우체국 편지" desc="첫 달 안내 3통 · 그 뒤 한 달에 한 통 이하" value={post} onValueChange={setPost} />
        <Note>아직 답장이 없는 첫 편지는 3통까지 보낼 수 있어요. 7일 동안 답장이 없거나 상대가 정중히 넘기면 한 자리가 비어요. 받은 첫 편지는 5통까지 쌓이고, 가득 차면 친구 찾기에서 잠시 빠져요.</Note>
      </View>
    </Screen>
  );
}
