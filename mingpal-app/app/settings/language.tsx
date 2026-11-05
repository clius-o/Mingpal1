// ME03 언어 설정 — Figma 269:3011
import { View } from 'react-native';
import { Note, PageHeader, Screen, SettingsRow } from '../../src/components/primitives';
import { layout } from '../../src/theme';

export default function LanguageSettings() {
  return (
    <Screen>
      <PageHeader title="언어 설정" />
      <View style={{ paddingHorizontal: layout.screenPadding, paddingTop: 16 }}>
        <SettingsRow label="모국어" value="한국어" />
        <SettingsRow label="잘하는 언어" value="없음" />
        <SettingsRow label="배우는 언어" value="영어" />
        <SettingsRow label="수준" value="일상 이야기" />
        <SettingsRow label="앱 화면 언어" value="한국어" />
        <Note>배우는 언어를 바꿔도 지금 친구들과 쓰는 언어는 그대로예요. 바꾸고 싶으면 친구별 기록에서 친구에게 제안할 수 있어요.</Note>
        <Note>앱 화면 언어를 바꿔도 편지 내용은 번역되지 않아요.</Note>
      </View>
    </Screen>
  );
}
