// ES02 로딩 6종 — Figma 277:3512 (설계 보드). 불러오는 중에는 구조만 보이고 빈 상태 문구는 먼저 보이지 않는다.
import { View } from 'react-native';
import { PageHeader, Screen, SkeletonRow } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { layout } from '../../src/theme';

const LABELS = ['1 · 우편함', '2 · 첫 편지', '3 · 친구 찾기', '4 · 표현장', '5 · 친구별 기록', '6 · 배움 홈'];

export default function Loading() {
  return (
    <Screen>
      <PageHeader title="로딩 6종" />
      <View style={{ paddingHorizontal: layout.screenPadding, paddingTop: 18, gap: 10 }}>
        {LABELS.map((l) => (
          <SkeletonRow key={l} label={l} />
        ))}
        <Txt v="maru16" color="sub" style={{ fontSize: 13, lineHeight: 22, marginTop: 10 }}>불러오는 중에는 구조만 보이고, 빈 상태 문구는 먼저 보이지 않아요.</Txt>
      </View>
    </Screen>
  );
}
