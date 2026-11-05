// ME10 계정 — Figma 269:3219
import { router } from 'expo-router';
import { View } from 'react-native';
import { Note, PageHeader, Screen, SettingsRow } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';
import { account } from '../../src/data/mock';

export default function Account() {
  return (
    <Screen>
      <PageHeader title="계정" />
      <View style={{ paddingHorizontal: layout.screenPadding, paddingTop: 16 }}>
        <View style={{ minHeight: 55, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: colors.line }}>
          <Txt v="maru16" style={{ flex: 1 }}>로그인 이메일</Txt>
          <Txt v="caption13" color="sub">{account.email}</Txt>
        </View>
        <SettingsRow label="도움말" />
        <SettingsRow label="문의하기" />
        <SettingsRow label="약관·개인정보 처리방침" />
        <SettingsRow label="오픈소스 라이선스" />
        <View style={{ height: 15 }} />
        <SettingsRow label="로그아웃" hideChevron />
        <SettingsRow label="탈퇴" onPress={() => router.push('/safety/withdraw')} />
        <Note>로그아웃 전에 이 기기에만 저장된 초안이 있으면 먼저 알려 드려요.</Note>
      </View>
    </Screen>
  );
}
