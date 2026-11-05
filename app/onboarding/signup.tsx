// ON02 가입 — Figma 269:1817. 로그인은 아직 연결 전: 이메일 링크 화면으로만 이어진다.
import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, PageHeader, SecondaryButton } from '../../src/components/primitives';
import { Field } from '../../src/components/onboarding';
import { Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { layout } from '../../src/theme';

export default function Signup() {
  const [email, setEmail] = useState('');
  const valid = /^\S+@\S+\.\S+$/.test(email.trim());
  return (
    <Screen>
      <PageHeader title="밍팔 시작하기" />
      <View style={{ paddingHorizontal: layout.screenPadding, paddingTop: 30, gap: 12 }}>
        <Button label="Apple로 계속하기" />
        <SecondaryButton label="Google로 계속하기" />
        <Txt v="caption13" color="sub" style={{ textAlign: 'center', marginVertical: 8 }}>또는</Txt>
        <Field label="이메일" value={email} onChangeText={setEmail} placeholder="hello@example.com" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} textContentType="emailAddress" />
        <SecondaryButton label="이메일로 계속하기" disabled={!valid} onPress={() => router.push({ pathname: '/onboarding/mail', params: { email: email.trim() } })} />
        <Txt v="caption13" color="sub" style={{ lineHeight: 20 }}>이메일로 로그인 링크를 보내 드려요. 비밀번호는 없어요.</Txt>
      </View>
    </Screen>
  );
}
