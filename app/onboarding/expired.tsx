// ON10 · 링크 만료 — Figma 277:3493
import { router } from 'expo-router';
import { View } from 'react-native';
import { Button, PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { layout } from '../../src/theme';

export default function LinkExpired() {
  return (
    <Screen>
      <PageHeader title="링크가 만료됐어요" />
      <View style={{ paddingHorizontal: layout.screenPadding, paddingTop: 20, gap: 28 }}>
        <Txt v="body14" color="sub" style={{ fontSize: 15, lineHeight: 20 }}>새 링크를 보내 드릴게요.</Txt>
        <Button label="새 링크 받기" onPress={() => router.replace('/onboarding/signup')} />
      </View>
    </Screen>
  );
}
