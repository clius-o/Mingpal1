// FD01 친구 찾기 — not part of the v3 core 8; implement from Figma 269:2190 (FD01) next.
import { router } from 'expo-router';
import { View } from 'react-native';
import { Button, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';

export default function FindFriends() {
  return (
    <Screen bottomInset={false}>
      <View style={{ paddingTop: 46, paddingHorizontal: 24, gap: 16 }}>
        <Txt v="title">친구 찾기</Txt>
        <Txt v="body14" color="sub">오늘의 한 장면으로 어울리는 친구를 찾아요.</Txt>
        <Button label="추천 친구 소개 보기" onPress={() => router.push('/profile/ines')} />
      </View>
    </Screen>
  );
}
