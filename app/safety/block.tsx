// SF02 차단 — Figma 269:2549 (신고 직후 이어지는 차단 확인)
import { router } from 'expo-router';
import { View } from 'react-native';
import { Bullets, Button, FooterActions, Screen, SecondaryButton, Rule } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

export default function Block() {
  return (
    <Screen>
      <View style={{ flex: 1, paddingHorizontal: layout.screenPadding, paddingTop: 42, gap: 24 }}>
        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, paddingHorizontal: 13, paddingVertical: 9 }}>
          <Txt v="caption13">신고가 접수됐어요. 처리 결과는 따로 알려 드리지 않을 수 있어요.</Txt>
        </View>
        <View style={{ gap: 8 }}>
          <Txt v="title">{'Lukas를\n차단할까요?'}</Txt>
          <Rule />
        </View>
        <Bullets
          items={[
            '서로 편지를 보낼 수 없어요',
            '지금까지의 편지는 그대로 남아요',
            'Lukas에게 차단 사실을 알리지 않아요. 편지를 보내려 하면 “지금 이 사용자에게 편지를 보낼 수 없어요”라고만 보여요',
            '내 공간 › 차단 목록에서 풀 수 있어요',
          ]}
        />
      </View>
      <FooterActions>
        <SecondaryButton label="그대로 두기" style={{ flex: 1 }} onPress={() => router.dismissAll()} />
        <View style={{ flex: 1 }}><Button label="차단하기" onPress={() => router.dismissAll()} /></View>
      </FooterActions>
    </Screen>
  );
}
