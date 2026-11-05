// ME06 차단 목록 — Figma 269:3119
import { Image } from 'expo-image';
import { View } from 'react-native';
import { img } from '../../src/assets';
import { Note, PageHeader, Screen, SmallButton } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

export default function Blocked() {
  return (
    <Screen>
      <PageHeader title="차단 목록" />
      <View style={{ paddingHorizontal: layout.screenPadding }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.line }}>
          <Image source={img.avatarLukas} style={{ width: 48, height: 48 }} contentFit="contain" />
          <View style={{ flex: 1 }}>
            <Txt v="name">Lukas</Txt>
            <Txt v="meta12" color="sub">11월 4일에 차단</Txt>
          </View>
          <SmallButton label="차단 해제" />
        </View>
        <Note>차단을 풀어도 넘긴 첫 편지나 보관 상태는 그대로예요. 상대가 나를 차단했다면 여전히 편지를 보낼 수 없어요.</Note>
      </View>
    </Screen>
  );
}
