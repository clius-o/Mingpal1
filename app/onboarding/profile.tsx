// ON03 기본 정보·약관 — Figma 269:1837 (진행 1/7). 필수 동의 전에는 "다음"이 흐리게 비활성.
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { CheckRow, Field, OnboardingScreen } from '../../src/components/onboarding';
import { Rule } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

export default function BasicInfo() {
  const [nick, setNick] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [year, setYear] = useState('');
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const y = Number(year);
  const adult = year.length === 4 && y <= new Date().getFullYear() - 18 && y >= 1900;
  const ready = nick.trim().length > 0 && country.trim().length > 0 && adult && terms && privacy;
  return (
    <OnboardingScreen
      step={1}
      title="시작하기 전에"
      primaryLabel="다음"
      primaryDisabled={!ready}
      onPrimary={() => router.push('/onboarding/language')}
      hint={ready ? undefined : '필수 항목에 모두 동의하면 넘어갈 수 있어요'}
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 20, paddingBottom: 16, gap: 18 }}>
        <Field label="닉네임" value={nick} onChangeText={setNick} placeholder="지윤" maxLength={20} />
        <View>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Field label="나라" value={country} onChangeText={setCountry} placeholder="대한민국" />
            <Field label="도시 (선택)" value={city} onChangeText={setCity} placeholder="서울" />
          </View>
          <Txt v="caption13" color="sub" style={{ marginTop: 8, lineHeight: 20 }}>나라와 도시는 편지 거리와 우표에 쓰여요.</Txt>
        </View>
        <View>
          <Field label="태어난 해" value={year} onChangeText={(t) => setYear(t.replace(/\D/g, '').slice(0, 4))} placeholder="1992" keyboardType="number-pad" />
          <Txt v="caption13" color={year.length === 4 && !adult ? 'red' : 'sub'} style={{ marginTop: 8, lineHeight: 20 }}>만 18세 이상만 쓸 수 있어요. 성별과 실명은 묻지 않아요.</Txt>
        </View>
        <View style={{ backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line }}>
          <CheckRow label="서비스 이용약관 (필수)" checked={terms} onToggle={() => setTerms((v) => !v)} onView={() => {}} />
          <Rule thickness={1} color="line" />
          <CheckRow label="개인정보 처리방침 (필수)" checked={privacy} onToggle={() => setPrivacy((v) => !v)} onView={() => {}} />
        </View>
        <Txt v="caption13" color="sub" style={{ lineHeight: 20 }}>편지는 AI 첨삭과 안전 검사에 쓰여요.</Txt>
      </ScrollView>
    </OnboardingScreen>
  );
}
