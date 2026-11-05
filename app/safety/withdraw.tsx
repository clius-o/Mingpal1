// SF03 탈퇴 — Figma 269:2570. 확인 체크 전에는 버튼이 흐리게 비활성.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Bullets, FooterActions, PageHeader, Screen, SecondaryButton } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

export default function Withdraw() {
  const [checked, setChecked] = useState(false);
  return (
    <Screen>
      <PageHeader title="밍팔을 떠나기 전에" />
      <View style={{ flex: 1, paddingHorizontal: layout.screenPadding, paddingTop: 20, gap: 20 }}>
        <Bullets items={['내가 보낸 편지는 친구들의 기록에 ‘탈퇴한 사용자’로 남아요', '받은 편지, 초안, 표현장은 볼 수 없게 되고 30일 안에 지워져요', '되돌릴 수 없어요']} />
        <View style={{ gap: 6 }}>
          <Txt v="strong14" style={{ fontSize: 13, lineHeight: 18 }}>이 기기에만 저장된 초안 1개</Txt>
          <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}>
            <Txt v="maru16" style={{ flex: 1, fontSize: 15, lineHeight: 22 }}>Inés에게 쓰던 첫 편지</Txt>
            <Pressable accessibilityRole="button" style={{ minHeight: 44, minWidth: 84, alignItems: 'flex-end', justifyContent: 'center' }}>
              <Txt v="body14Medium" style={{ fontSize: 13 }}>복사하기</Txt>
            </Pressable>
          </View>
        </View>
        <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={() => setChecked((c) => !c)} style={{ minHeight: 44, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{ width: 20, height: 20, borderWidth: 1.5, borderColor: colors.ink, alignItems: 'center', justifyContent: 'center' }}>
            {checked ? <View style={{ width: 10, height: 10, backgroundColor: colors.ink }} /> : null}
          </View>
          <Txt v="body14" style={{ fontSize: 15, lineHeight: 20 }}>위 내용을 확인했어요</Txt>
        </Pressable>
      </View>
      <FooterActions>
        <SecondaryButton label="다시 로그인하고 탈퇴하기" disabled={!checked} style={{ flex: 1 }} onPress={() => router.dismissAll()} />
      </FooterActions>
    </Screen>
  );
}
