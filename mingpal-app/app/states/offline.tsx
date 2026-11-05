// SY02 오류·오프라인 — Figma 269:2593
import { Image } from 'expo-image';
import { View } from 'react-native';
import { img } from '../../src/assets';
import { OfflineBanner, PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const ROWS = [
  { name: 'Maya', avatar: img.avatarMaya, preview: '지난 주말에 비가 많이 와서 빵집까지 먼 길로 걸어갔어요…', ko: true },
  { name: 'Daniel', avatar: img.avatarDaniel, preview: 'Thanks for telling me about Jeonju. I looked up bibimbap…', ko: false },
];

export default function Offline() {
  return (
    <Screen>
      <PageHeader title="우편함" back={false} />
      <View style={{ paddingHorizontal: layout.screenPadding, paddingTop: 16, gap: 0 }}>
        <OfflineBanner body="받아 둔 편지는 읽을 수 있고, 쓰던 편지는 이 기기에 저장돼요. 다시 연결돼도 편지를 자동으로 보내지는 않아요." />
        {ROWS.map((r) => (
          <View key={r.name} style={{ flexDirection: 'row', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.line, marginTop: r.name === 'Maya' ? 16 : 0 }}>
            <Image source={r.avatar} style={{ width: 48, height: 48 }} contentFit="contain" />
            <View style={{ flex: 1 }}>
              <Txt v="name">{r.name}</Txt>
              <Txt v={r.ko ? 'maru16' : 'news16'} color="ink2" numberOfLines={1} style={{ fontSize: 15, lineHeight: 21 }}>{r.preview}</Txt>
            </View>
          </View>
        ))}
        <Txt v="meta12" color="sub" style={{ lineHeight: 18, marginTop: 28 }}>불러오는 중에는 빈 우편함 문구를 먼저 보이지 않아요. 새로고침에 실패하면 목록은 그대로 두고 위에 ‘새 편지를 불러오지 못했어요 · 다시 시도’를 보여요.</Txt>
      </View>
    </Screen>
  );
}
