// Minimal UI-language layer. Korean is the default; English is the "Maya's view" UI (Figma 279:3751 section).
// Only the screens that have an English design use t(); everything else stays Korean for now.
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type Lang = 'ko' | 'en';

const ko = {
  'intro.skip': '건너뛰기',
  'intro.title': '편지로 사귀는\n해외 친구',
  'intro.l1': '채팅 대신, 생각해서 쓰는 편지로 만나요.',
  'intro.l2': '막히면 AI가 도와요. 그 도움은 나만 알아요.',
  'intro.l3': '배운 표현이 쌓이고, 다음 편지에 써 봐요.',
  'intro.start': '시작하기',
  'intro.have': '이미 계정이 있어요',

  'first.title': '첫 편지',
  'first.received': '받은 편지',
  'first.sent': '보낸 편지',
  'first.note': '답장을 보내면 편지가 시작돼요. 따로 수락할 필요는 없어요.',
  'first.new': '● 새 편지',
  'first.past': '지난 요청 2',
  'first.foot': '받은 첫 편지는 7일 안에 답장하거나 ‘정중히 넘기기’를 고를 수 있어요. 넘겨도 상대에게는 “지금 새 친구를 받기 어려워요”만 전해져요.',

  'read.translate': '영어로는?',
  'read.meaning': '뜻 보기',
  'read.save': '표현 저장',
  'read.reply': '답장에 쓰기',

  'confirm.title': '보내기 전 확인',
  'confirm.more': '더 고치기',
  'confirm.send': '편지 보내기',
  'confirm.note': '보낸 편지는 취소하거나 고칠 수 없어요.',
  'confirm.later': '나중에',
  'confirm.retry': '다시 보내기',
  'confirm.check': '상태 확인하기',
  'confirm.failTitle': '편지를 보내지 못했어요',
  'confirm.failBody': '쓰던 편지는 그대로 있어요. 연결을 확인하고 다시 보내 주세요.',
  'confirm.unknownTitle': '편지가 갔는지 확인하고 있어요',
  'confirm.unknownBody': '확인되기 전에는 다시 보내지 않아요.',

  'tr.title': '영어로는 어떻게 말할까?',
  'tr.ai': 'AI · 나만 보여요',
  'tr.said': 'Maya가 쓴 문장',
  'tr.sentence': '빵집까지 먼 길로 걸어갔어요.',
  'tr.in': '영어로는',
  'tr.answerPre': 'I ',
  'tr.answerHit': 'took the long way',
  'tr.answerPost': ' to the bakery.',
  'tr.phrase': 'take the long way',
  'tr.explain': '일부러 먼 길로 가다. 산책하듯 돌아갈 때 자연스러워요.',
  'tr.save': '표현장에 저장',
  'tr.foot': '읽기 도움은 횟수 제한이 없어요',
} as const;

type Key = keyof typeof ko;

const en: Record<Key, string> = {
  'intro.skip': 'Skip',
  'intro.title': 'Friends abroad,\nmade by letter',
  'intro.l1': 'Meet through letters, not quick chats.',
  'intro.l2': "When you're stuck, AI helps. Only you see it.",
  'intro.l3': 'Phrases you learn pile up, ready for your next letter.',
  'intro.start': 'Get started',
  'intro.have': 'I already have an account',

  'first.title': 'First letters',
  'first.received': 'Received',
  'first.sent': 'Sent',
  'first.note': 'Reply to start writing to each other. No need to accept.',
  'first.new': '● New letter',
  'first.past': 'Past requests 2',
  'first.foot': 'Reply to a first letter within 7 days, or choose ‘Politely pass’. If you pass, they only see “Not taking new friends right now.”',

  // The next three labels are not in the English Figma frames (it shows a floating menu instead); wording needs copy review.
  'read.translate': 'In Korean?',
  'read.meaning': 'Meaning',
  'read.save': 'Save phrase',
  'read.reply': 'Use in reply',

  'confirm.title': 'Before you send',
  'confirm.more': 'Edit more',
  'confirm.send': 'Send letter',
  'confirm.note': "Sent letters can't be undone or edited.",
  // Failure-state strings below have no English frame yet; wording needs copy review.
  'confirm.later': 'Later',
  'confirm.retry': 'Send again',
  'confirm.check': 'Check status',
  'confirm.failTitle': "Your letter wasn't sent",
  'confirm.failBody': 'Your draft is safe. Check your connection and send it again.',
  'confirm.unknownTitle': 'Checking whether your letter went through',
  'confirm.unknownBody': "We won't send it again until we know.",

  'tr.title': 'How would you say this in Korean?',
  'tr.ai': 'AI · Just for you',
  'tr.said': 'Sentence Jiyun wrote',
  'tr.sentence': 'I took the long way to the bakery.',
  'tr.in': 'In Korean',
  'tr.answerPre': '',
  'tr.answerHit': '빵집까지 돌아서 갔어요.',
  'tr.answerPost': '',
  'tr.phrase': '돌아서 가다',
  'tr.explain': 'To go the longer way on purpose. Natural for a stroll.',
  'tr.save': 'Save to Phrasebook',
  'tr.foot': 'Reading help has no daily limit',
};

const dict: Record<Lang, Record<Key, string>> = { ko, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LocaleContext = createContext<Ctx>({ lang: 'ko', setLang: () => {} });

export function LocaleProvider({ children, initial = 'ko' }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLang] = useState<Lang>(initial);
  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const { lang, setLang } = useContext(LocaleContext);
  const t = (key: Key) => dict[lang][key];
  return { lang, setLang, t };
}
