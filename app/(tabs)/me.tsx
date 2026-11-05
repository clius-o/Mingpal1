// ME01 내 공간 — not part of the v3 core 8; implement from Figma 269:2888 (ME01) next.
import { View } from 'react-native';
import { Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';

export default function Me() {
  return (
    <Screen bottomInset={false}>
      <View style={{ paddingTop: 46, paddingHorizontal: 24, gap: 16 }}>
        <Txt v="title">내 공간</Txt>
      </View>
    </Screen>
  );
}
