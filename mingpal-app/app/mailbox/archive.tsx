// MB04 보관 — Figma 269:2037. 보관해도 기록은 그대로, 새 편지가 오면 우편함으로 돌아온다.
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { BackBar, Rule, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

const ARCHIVED = [
  { id: 'oliver', name: 'Oliver', city: '멜버른', date: '8월 14일', avatar: img.avatarA4, english: true, text: 'Sorry for the late reply. Work has been crazy, but I finally…' },
  { id: 'priya', name: 'Priya', city: '푸네', date: '7월 2일', avatar: img.avatarA5, english: false, text: '한국 겨울은 정말 추워요? 저는 눈을 한 번도 본 적이 없어요…' },
];

export default function Archive() {
  const [list, setList] = useState(ARCHIVED);
  return (
    <Screen>
      <BackBar />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingBottom: 24 }}>
        <Txt v="title">보관한 친구</Txt>
        <Txt v="maru16" color="ink2" style={{ fontSize: 15, lineHeight: 21, marginTop: 10, marginBottom: 20 }}>보관해도 기록은 그대로예요. 새 편지가 오면 우편함으로 돌아와요.</Txt>
        <Rule />
        {list.map((f) => (
          <View key={f.id} style={{ flexDirection: 'row', gap: 12, paddingTop: 16, borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Image source={f.avatar} style={{ width: 48, height: 48 }} contentFit="contain" />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                <Txt v="name">{f.name}</Txt>
                <Txt v="caption13" color="sub" style={{ flex: 1 }}>{f.city}</Txt>
                <Txt v="caption13" color="sub">{f.date}</Txt>
              </View>
              <Txt v={f.english ? 'news16' : 'maru16'} color="ink2" numberOfLines={2} style={{ fontSize: 15, lineHeight: 21, marginTop: 4 }}>{f.text}</Txt>
              <Pressable accessibilityRole="button" onPress={() => setList((l) => l.filter((x) => x.id !== f.id))} style={{ minHeight: 44, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Txt v="body14Medium" style={{ fontSize: 13, lineHeight: 20 }}>보관 해제</Txt>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}
