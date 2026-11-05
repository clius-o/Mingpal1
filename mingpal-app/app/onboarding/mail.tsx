// ON10 메일 확인 — Figma 277:3469. 다시 보내기는 60초 뒤에 열린다.
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { img } from '../../src/assets';
import { Button, PageHeader, Screen, SecondaryButton } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { layout } from '../../src/theme';

const RESEND_SECONDS = 60;

export default function MailCheck() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [left, setLeft] = useState(RESEND_SECONDS);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return (
    <Screen>
      <PageHeader title="메일함을 확인해 주세요" />
      <View style={{ paddingHorizontal: layout.screenPadding, paddingTop: 20, gap: 0 }}>
        <Txt v="body14" color="sub" style={{ fontSize: 15, lineHeight: 20 }}>{`${email || 'name@example.com'}으로 로그인 링크를 보냈어요. 링크를 누르면 바로 시작돼요.`}</Txt>
        <View style={{ marginTop: 32 }}><Button label="메일 앱 열기" onPress={() => Linking.openURL('message://').catch(() => {})} /></View>
        <Txt v="strong15" style={{ marginTop: 32, lineHeight: 18 }}>메일이 안 왔나요?</Txt>
        <Txt v="caption13" color="sub" style={{ marginTop: 10, lineHeight: 20 }}>스팸함도 확인해 보세요.</Txt>
        <View style={{ marginTop: 20 }}>
          <SecondaryButton label="다시 보내기" disabled={left > 0} onPress={() => setLeft(RESEND_SECONDS)} />
        </View>
        <Txt v="caption13" color="sub" style={{ marginTop: 8, lineHeight: 20 }}>{left > 0 ? `${left}초 뒤에 다시 보낼 수 있어요` : '다시 보낼 수 있어요'}</Txt>
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start', marginTop: 4 }}>
          <Txt v="strong15" style={{ lineHeight: 18 }}>이메일 바꾸기</Txt>
        </Pressable>
        <Image source={img.illMail} style={{ alignSelf: 'center', width: 240, height: 165, marginTop: 24 }} contentFit="contain" />
      </View>
    </Screen>
  );
}
