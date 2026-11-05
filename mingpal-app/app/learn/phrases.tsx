// LR03 표현장 — Figma 269:2337. 저장한 표현 목록: 검색 + 구분(전체/써 본 표현/친구 편지/AI 첨삭).
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Chip } from '../../src/components/onboarding';
import { AiBadge, EmptyState, PageHeader, Screen } from '../../src/components/primitives';
import { Txt } from '../../src/components/Txt';
import { img } from '../../src/assets';
import { phrases, type Phrase } from '../../src/data/mock';
import { colors, fonts, layout } from '../../src/theme';

type Filter = 'all' | 'used' | 'letter' | 'ai';

export default function Phrases() {
  const { filter: initial } = useLocalSearchParams<{ filter?: Filter }>();
  const [filter, setFilter] = useState<Filter>(initial === 'used' ? 'used' : 'all');
  const [query, setQuery] = useState('');
  const counts = useMemo(() => ({ all: phrases.length, used: phrases.filter((p) => p.used).length }), []);
  const shown = phrases.filter((p) => {
    if (filter === 'used' && !p.used) return false;
    if (filter === 'letter' && p.kind !== 'letter') return false;
    if (filter === 'ai' && p.kind !== 'ai') return false;
    const q = query.trim().toLowerCase();
    return q === '' || p.text.toLowerCase().includes(q) || p.source.toLowerCase().includes(q);
  });
  return (
    <Screen>
      <PageHeader title="표현장" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: layout.screenPadding, paddingTop: 16, paddingBottom: 24 }}>
        <TextInput
          accessibilityLabel="표현 검색"
          placeholder="표현 검색"
          placeholderTextColor={colors.sub}
          value={query}
          onChangeText={setQuery}
          style={{ height: 44, paddingHorizontal: 13, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.line, fontFamily: fonts.prRegular, fontSize: 14, color: colors.ink }}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12, marginBottom: 6 }}>
          <Chip label={`전체 ${counts.all}`} selected={filter === 'all'} onPress={() => setFilter('all')} />
          <Chip label={`써 본 표현 ${counts.used}`} selected={filter === 'used'} onPress={() => setFilter('used')} />
          <Chip label="친구 편지" selected={filter === 'letter'} onPress={() => setFilter('letter')} />
          <Chip label="AI 첨삭" selected={filter === 'ai'} onPress={() => setFilter('ai')} />
        </View>
        {shown.length === 0 ? (
          <View style={{ height: 380 }}>
            <EmptyState illustration={img.illEmptyPhrases} title="저장한 표현이 없어요." body="편지를 읽거나 쓰다 저장하면 여기에 모여요." />
          </View>
        ) : (
          shown.map((p) => <PhraseRow key={p.id} p={p} />)
        )}
      </ScrollView>
    </Screen>
  );
}

function PhraseRow({ p }: { p: Phrase }) {
  return (
    <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: '/learn/phrase/[id]', params: { id: p.id } })} style={{ paddingVertical: 14, gap: 4, borderBottomWidth: 1, borderBottomColor: colors.line }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Txt v="news20" style={{ fontSize: 18, lineHeight: 26, flexShrink: 1 }}>{p.text}</Txt>
        {p.used ? (
          <View style={{ height: 20, paddingHorizontal: 5, borderWidth: 1, borderColor: colors.red, borderRadius: 3, justifyContent: 'center' }}>
            <Txt v="meta12Medium" color="red" style={{ lineHeight: 14 }}>써 봄</Txt>
          </View>
        ) : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {p.kind === 'ai' ? <AiBadge /> : null}
        <Txt v="meta12" color="sub" style={{ flexShrink: 1 }}>{p.source}</Txt>
      </View>
    </Pressable>
  );
}
