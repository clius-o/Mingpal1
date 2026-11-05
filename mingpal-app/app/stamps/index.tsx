// ST01 우표 그림 — Figma 269:2642. 도시 글자는 지금 있는 곳 그대로, 그림만 바꾼다. 어떤 우표든 편지 속도는 같다.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { img } from '../../src/assets';
import { Button, FooterActions, PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { stampPictures } from '../../src/data/mock';
import { colors, layout } from '../../src/theme';

export default function StampPictures() {
  const [pick, setPick] = useState<string>('default');
  const unlocked = stampPictures.filter((s) => !('locked' in s)).length;
  return (
    <Screen>
      <PageHeader title="우표 그림" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 20, paddingBottom: 16 }}>
        <Image source={img.stampSeoul} style={{ alignSelf: 'center', width: 100, height: 131 }} contentFit="cover" />
        <Txt v="caption13" color="sub" style={{ textAlign: 'center', marginTop: 14, lineHeight: 20 }}>SEOUL · 대한민국 글자는 지금 있는 곳이라 그대로예요. 그림만 바꿀 수 있어요.</Txt>
        <Txt v="strong14" style={{ marginTop: 28, marginBottom: 12, fontSize: 13, lineHeight: 18 }}>{`내 우표 · ${unlocked}개 열렸어요`}</Txt>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 14, justifyContent: 'space-between' }}>
          {stampPictures.map((s) => {
            const locked = 'locked' in s;
            const on = pick === s.id;
            return (
              <Pressable
                key={s.id}
                accessibilityRole="radio"
                accessibilityLabel={locked ? `${s.label}, 잠김, ${s.locked}` : s.label}
                accessibilityState={{ selected: on, disabled: locked }}
                disabled={locked}
                onPress={() => setPick(s.id)}
                style={{ width: 78, alignItems: 'center' }}
              >
                <View style={{ width: 78, height: 78, backgroundColor: colors.card, borderWidth: on ? 2 : 1, borderColor: on ? colors.ink : colors.line, padding: on ? 2 : 3 }}>
                  <Image source={s.source} style={{ width: '100%', height: '100%', opacity: locked ? 0.3 : 1 }} contentFit="contain" />
                </View>
                <Txt v={locked ? 'caption13' : 'strong14'} color={locked ? 'sub' : 'ink'} style={{ marginTop: 6, fontSize: 13, lineHeight: 18 }}>{s.label}</Txt>
                {locked ? <Txt v="meta12" color="sub" style={{ textAlign: 'center', lineHeight: 14, width: 86 }}>{s.locked}</Txt> : null}
              </Pressable>
            );
          })}
        </View>
        <Txt v="caption13" color="sub" style={{ marginTop: 22 }}>우표는 편지를 쓰며 하나씩 열려요. 어떤 우표든 편지가 가는 속도는 같아요.</Txt>
      </ScrollView>
      <FooterActions>
        <View style={{ flex: 1 }}><Button label="이 우표 쓰기" onPress={() => router.back()} /></View>
      </FooterActions>
    </Screen>
  );
}
