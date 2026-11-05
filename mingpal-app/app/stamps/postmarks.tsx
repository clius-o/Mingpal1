// ST02 기념 소인 — Figma 269:2686. 친구와 주고받은 편지 수에 따라 두 사람의 편지에 찍힌다. 친구마다 따로 쌓이고 쉬어도 줄지 않는다.
import { Image } from 'expo-image';
import { ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { postmarkKinds } from '../../src/data/mock';
import { colors, layout } from '../../src/theme';

export default function Postmarks() {
  return (
    <Screen>
      <PageHeader title="기념 소인 4종" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 16, paddingBottom: 24 }}>
        <Txt v="caption13" color="sub" style={{ lineHeight: 20 }}>친구와 편지를 주고받으면 두 사람의 편지에 찍히는 소인이에요.</Txt>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
          {postmarkKinds.map((p) => (
            <View key={p.id} style={{ width: '48%', flexGrow: 1, height: 160, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, alignItems: 'center' }}>
              <View style={{ width: 120, height: 50, marginTop: 33, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={img.postmark} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} contentFit="cover" />
                <Txt v="name" style={{ fontSize: 18, lineHeight: 22 }}>{p.mark}</Txt>
              </View>
              <Txt v="meta12" color="sub" style={{ marginTop: 28 }}>{p.title}</Txt>
              <Txt v="meta12" color="ink2" style={{ marginTop: 0 }}>{p.rule}</Txt>
            </View>
          ))}
        </View>
        <Txt v="meta12Strong" color="sub" style={{ marginTop: 24 }}>편지에서는 이렇게 보여요</Txt>
        <View style={{ marginTop: 8, height: 92, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, padding: 13 }}>
          <Txt v="caption13" color="sub" style={{ lineHeight: 16 }}>Maya · 리스본, 10,400km</Txt>
          <Txt v="news16" color="ink2" style={{ fontSize: 15, lineHeight: 21, marginTop: 8, width: 200 }}>Hi Jiyun, thank you for the long letter…</Txt>
          <Image source={img.postmark} style={{ position: 'absolute', right: 13, top: 11, width: 90, height: 37 }} contentFit="cover" />
        </View>
        <Txt v="caption13" color="sub" style={{ marginTop: 14 }}>친구마다 따로 쌓여요. 쉬어도 줄지 않고, 연속으로 쓰지 않아도 받을 수 있어요.</Txt>
      </ScrollView>
    </Screen>
  );
}
