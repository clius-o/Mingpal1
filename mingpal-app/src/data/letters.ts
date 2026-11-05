// LT01 letter models. One screen renders all variants (Figma 269:717 / 772 / 826 / 277:3657 and the 279:3800 English view).
import { mayaLetterBody } from './mock';
import type { Lang } from '../i18n';

export type LetterModel = {
  from: string;
  dateLong: string;
  place: string;
  notice?: { kind: 'stamp'; text: string } | { kind: 'warn'; text: string; action: string };
  quote?: { label: string; text: string; english: boolean };
  body: string[];
  bodyEnglish: boolean;
  /** Body font size for English letters (Figma: 18 in the Korean UI, 17 in the English UI). */
  bodySize?: number;
  primary: string;
  /** Index of the sentence highlighted on open (영어 편지 문장 메뉴 variant). */
  selected?: number;
  /** "정중히 넘기기" link (받은 첫 편지). */
  skip?: string;
  /** Folded because the user reported it (신고한 편지). */
  reported?: string;
};

const MAYA_HEAD = { from: 'From. Maya', dateLong: '2026년 11월 4일', place: '리스본, 10,400km 떨어진 곳에서' };
const STAMP_PT = { kind: 'stamp' as const, text: '포르투갈 우표가 도착했어요' };
const QUOTE_KO = { label: '지윤 씨가 쓴 문장', text: '“Sunday mornings are a little louder here.”', english: true };

const ko: Record<string, LetterModel> = {
  'maya-4': { ...MAYA_HEAD, notice: STAMP_PT, quote: QUOTE_KO, body: mayaLetterBody, bodyEnglish: false, primary: '이어 쓰기' },
  'maya-first': {
    ...MAYA_HEAD,
    notice: STAMP_PT,
    body: ['지윤 씨, 안녕하세요!', '빵집 이야기를 읽고 편지를 써요. 저는 리스본에 살아요. 우리 동네에도 작은 빵집이 많아요.', '지윤 씨는 어떤 빵을 제일 좋아해요?'],
    bodyEnglish: false,
    primary: '답장 쓰기',
    skip: '정중히 넘기기',
  },
  'maya-money': {
    ...MAYA_HEAD,
    notice: { kind: 'warn', text: '편지에서 돈 이야기가 나오면 조심하세요', action: '신고하기' },
    quote: QUOTE_KO,
    body: ['이 문장을 읽고 웃었어요. 여기 일요일은 조용해요.', '요즘 일이 조금 어려워졌어요.', '혹시 기프트카드를 조금 보내 줄 수 있어요?'],
    bodyEnglish: false,
    primary: '이어 쓰기',
  },
  'lena-en': {
    from: 'From. Lena',
    dateLong: '2026년 11월 4일',
    place: '베를린, 8,100km 떨어진 곳에서',
    body: ['Thank you for the long letter. I read it twice on the train this morning.', 'I looked it up, and now I want to try it.', 'What do you cook when it rains?'],
    bodyEnglish: true,
    bodySize: 18,
    primary: '이어 쓰기',
    selected: 1,
  },
  'maya-reported': { ...MAYA_HEAD, body: mayaLetterBody, bodyEnglish: false, primary: '이어 쓰기', reported: '신고한 편지예요 · 다시 보기' },
};

// English UI = Maya's view: she reads Jiyun's English letter (Figma 279:3800).
const en: Record<string, LetterModel> = {
  'maya-4': {
    from: 'From. Jiyun',
    dateLong: 'Nov 4, 2026',
    place: 'Seoul, 10,400 km away',
    notice: { kind: 'stamp', text: 'A stamp from Korea arrived' },
    quote: { label: 'A sentence you wrote', text: '“여기 일요일은 조용해요.”', english: false },
    body: [
      'I smiled at this line. Sundays are a little louder in Seoul.',
      'Last weekend it rained a lot, so I took the long way to the bakery. I sat by the window and watched people hurry by with umbrellas.',
      'Do you have a small routine that makes you feel at home?',
    ],
    bodyEnglish: true,
    bodySize: 17,
    primary: 'Keep writing',
  },
};

export function getLetter(id: string, lang: Lang): LetterModel {
  const table = lang === 'en' ? en : ko;
  return table[id] ?? table['maya-4'];
}

/** LT03 preview body: Jiyun → Maya in Korean UI, Maya → Jiyun (Korean text) in English UI (Figma 279:3854). */
export function getSendPreview(lang: Lang) {
  if (lang === 'en') {
    return {
      to: 'To. Jiyun',
      place: 'Seoul, 10,400 km away',
      english: false,
      body: [
        '지윤 씨에게,',
        '편지 고마워요. 비 오는 날 창가에 앉은 사진이 정말 좋았어요.',
        '집처럼 편한 작은 습관이 궁금하다고 했죠? 저는 일요일 아침에 창가에서 커피를 마셔요. 지난주에는 비가 와서 더 좋았어요.',
        '다음 주에 새 일이 시작돼서 조금 떨려요. 첫날이 어땠는지 알려 줄게요!',
        'Maya',
      ],
    };
  }
  return {
    to: 'To. Maya',
    place: '리스본, 10,400km 떨어진 곳으로',
    english: true,
    body: [
      'Hi Maya,',
      'Thank you for your letter. I loved the picture of you sitting by the window in the rain.',
      'You asked about a small routine that makes me feel at home. On Sunday evenings, I cook with my daughter. Last week we made a mess, but that made it even more fun.',
      'Jiyun',
    ],
  };
}
