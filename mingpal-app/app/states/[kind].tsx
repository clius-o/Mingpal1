// ES01 빈 상태 6종 — Figma 269:2726 / 2767 / 2779 / 2818 / 2859 / 2873.
// Each real screen can render <EmptyState …/> with these presets when its list is empty.
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { img } from '../../src/assets';
import { EmptyState, PageHeader, Screen } from '../../src/components/primitives';

const KINDS = {
  inbox: { title: '우편함', back: false, illustration: img.illEmptyInbox, heading: '아직 편지가 없어요.', body: '친구를 찾아 첫 편지를 보내 보세요.', action: '친구 찾기', to: '/find' },
  first: { title: '첫 편지', back: true, illustration: img.illEmptyFirst, heading: '받은 첫 편지가 없어요.', body: '새 편지가 오면 여기에 나타나요.' },
  phrases: { title: '표현장', back: false, illustration: img.illEmptyPhrases, heading: '저장한 표현이 없어요.', body: '편지를 읽거나 쓰다 저장하면 여기에 모여요.' },
  find: { title: '친구 찾기', back: false, illustration: img.illEmptyFind, heading: '지금 편지를 받을 수 있는 친구가 적어요.', body: '조건을 넓히거나 내일 다시 와 보세요.', action: '조건 바꾸기', to: '/find/filters' },
  review: { title: '오늘의 복습', back: true, illustration: img.illEmptyReview, heading: '오늘 복습할 카드가 없어요.', body: '표현을 저장하면 여기에 나타나요.', action: '표현장 보기', to: '/learn/phrases' },
  memo: { title: '일상 메모', back: true, illustration: img.illEmptyMemo, heading: '남겨 둔 메모가 없어요.', body: '메모를 남기면 편지를 쓸 때 카드로 올라와요.', action: '메모 남기기' },
} as const;

type Kind = keyof typeof KINDS;

export default function EmptyScreen() {
  const { kind } = useLocalSearchParams<{ kind: string }>();
  const k = KINDS[(kind as Kind) in KINDS ? (kind as Kind) : 'inbox'];
  const to = 'to' in k ? k.to : undefined;
  return (
    <Screen>
      <PageHeader title={k.title} back={k.back} />
      <View style={{ flex: 1 }}>
        <EmptyState
          illustration={k.illustration}
          title={k.heading}
          body={k.body}
          actionLabel={'action' in k ? k.action : undefined}
          onAction={to ? () => router.push(to as never) : undefined}
        />
      </View>
    </Screen>
  );
}
