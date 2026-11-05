// MB03 초안 — Figma 269:2011. 계정에 저장된 초안과, 이 기기에만 저장돼 재시도가 필요한 초안.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { Note, PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { colors, layout } from '../../src/theme';

type Draft = { id: string; friendId: string; name: string; kind: string; when: string; avatar: number; text: string; status: string };
const DRAFTS: Draft[] = [
  { id: 'd1', friendId: 'maya', name: 'Maya', kind: '답장', when: '오늘 23:40', avatar: img.avatarA1, text: 'Hi Maya, Thank you for your letter. I loved the picture of you sitting by the window…', status: '계정에 저장됨' },
  { id: 'd2', friendId: 'ines', name: 'Inés', kind: '첫 편지', when: '어제', avatar: img.avatarA3, text: 'Hello Inés! I read about your Saturday fruit. In Korea, persimmons are…', status: '이 기기에 저장됨 · 계정 저장 재시도' },
];

export default function Drafts() {
  const [list, setList] = useState(DRAFTS);
  return (
    <Screen>
      <PageHeader title="초안" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 12, paddingBottom: 24 }}>
        {list.map((d) => (
          <View key={d.id} style={{ borderBottomWidth: 1, borderBottomColor: colors.line }}>
            <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: '/write/[id]', params: { id: d.friendId } })} style={{ flexDirection: 'row', gap: 12, paddingTop: 20 }}>
              <Image source={d.avatar} style={{ width: 48, height: 48 }} contentFit="contain" />
              <View style={{ flex: 1, gap: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
                  <Txt v="name">{d.name}</Txt>
                  <Txt v="caption13" color="sub" style={{ flex: 1 }}>{d.kind}</Txt>
                  <Txt v="caption13" color="sub">{d.when}</Txt>
                </View>
                <Txt v="news16" color="ink2" numberOfLines={3} style={{ fontSize: 15, lineHeight: 21 }}>{d.text}</Txt>
              </View>
            </Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 60 }}>
              <Txt v="meta12" color="sub" style={{ flex: 1 }}>{d.status}</Txt>
              <Pressable accessibilityRole="button" accessibilityLabel={`${d.name} 초안 삭제`} onPress={() => setList((l) => l.filter((x) => x.id !== d.id))} style={{ minWidth: 56, minHeight: 44, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Txt v="body14Medium" color="sub" style={{ fontSize: 13, lineHeight: 20 }}>삭제</Txt>
              </Pressable>
            </View>
          </View>
        ))}
        <Note>누르면 이어서 써요.</Note>
      </ScrollView>
    </Screen>
  );
}
