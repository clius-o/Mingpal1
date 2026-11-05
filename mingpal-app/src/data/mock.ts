// Sample content from the Figma v3 core screens. Replace with Supabase queries (spec §14).
import { img } from '../assets';

export type Friend = {
  id: string;
  name: string;
  city: string;
  distanceKm: number;
  avatar: number;
  avatarBg: string;
  lastDate: string;
  preview: string;
  status?: 'new' | 'resting' | 'quiet' | 'post';
};

export const friends: Friend[] = [
  { id: 'maya', name: 'Maya', city: '리스본', distanceKm: 10400, avatar: img.avatarMaya, avatarBg: '#d3a88c', lastDate: '오늘', preview: '지난 주말에 비가 많이 와서 빵집까지 먼 길로 걸어갔어요. 창가에 앉아서 사람들이…', status: 'new' },
  { id: 'lena', name: 'Lena', city: '함부르크', distanceKm: 8600, avatar: img.avatarLena, avatarBg: '#e0d6c2', lastDate: '11월 1일', preview: 'Thank you for the long letter. I read it twice on the train this morning, and it made my commute feel short.' },
  { id: 'amara', name: 'Amara', city: '라고스', distanceKm: 11700, avatar: img.avatarAmara, avatarBg: '#d8cdb8', lastDate: '10월 20일', preview: '편지를 쉬고 있어요', status: 'resting' },
  { id: 'kenji', name: 'Kenji', city: '도쿄', distanceKm: 1150, avatar: img.avatarKenji, avatarBg: '#b4bb9c', lastDate: '9월 28일', preview: '한 달째 조용해요 · 보관하기', status: 'quiet' },
];

export type Letter = { id: string; friendId: string; date: string; dateLong: string; preview: string; isNew?: boolean; count?: number; month: string };

export const lettersFromMaya: Letter[] = [
  { id: 'maya-4', friendId: 'maya', month: '11월', date: '오늘', dateLong: '2026년 11월 4일', count: 4, isNew: true, preview: '지윤 씨, 안녕하세요! 지난 주말에 비가 많이 와서 빵집까지 먼 길로 걸어갔어요…' },
  { id: 'maya-3', friendId: 'maya', month: '10월', date: '10월 30일', dateLong: '2026년 10월 30일', isNew: true, preview: '사진 대신 글로 리스본의 가을을 보여 줄게요. 요즘 아침에는 안개가…' },
];

export const mayaLetterBody = [
  '이 문장을 읽고 웃었어요. 여기 일요일은 조용해요.',
  '지난 주말에 비가 많이 와서 빵집까지 먼 길로 걸어갔어요. 창가에 앉아서 사람들이 우산을 들고 빨리 가는 것을 봤어요.',
  '지윤 씨는 집처럼 편하게 느끼는 작은 습관이 있어요?',
];

export const draftReply = 'Hi Maya, Thank you for your letter. I loved the picture of you sitting by the window…';

export type Expression = { id: string; text: string; source: string; sourceKind: 'letter' | 'ai' | 'en'; used?: boolean };
export const recentExpressions: Expression[] = [
  { id: 'e1', text: 'I looked it up, and now I want to try it.', source: 'Lena의 편지에서', sourceKind: 'letter' },
  { id: 'e2', text: 'with the whole family', source: '첨삭에서', sourceKind: 'ai' },
  { id: 'e3', text: 'take the long way', source: 'Maya의 편지 ‘먼 길로 걸어갔어요’에서', sourceKind: 'en', used: true },
];

export const inesProfile = {
  name: 'Inés', city: '발렌시아', distanceKm: 9900,
  native: '스페인어', learning: '한국어 · 일상 이야기', fluent: '영어 · 자유롭게',
  scene: '토요일 아침마다 시장에서 처음 보는 과일을 하나씩 사 봐요. 이번 주는 감이었어요.',
  mode: '교환 편지', modeDesc: '나는 영어로, Inés는 한국어로 써요. 서툴러도 상대에게는 모국어라 잘 읽혀요.',
  interests: '시장 구경 · 요리 · 사진 · 한국 드라마 · 등산',
  taste: '편지 길이 여유 있게 · 답장은 일주일쯤',
};

export const formatKm = (n: number) => `${n.toLocaleString('en-US')}km`;

// ME10: Figma shows the placeholder "[이메일]"; replace with the signed-in user's email once auth exists.
export const account = { email: 'jiyoon@example.com' };

// ON09 avatar set (A/B series). a7 is the sample user's avatar.
export const avatarChoices = [
  { id: 'a1', source: img.avatarA1 }, { id: 'a2', source: img.avatarA2 }, { id: 'a3', source: img.avatarA3 }, { id: 'a4', source: img.avatarA4 },
  { id: 'a5', source: img.avatarA5 }, { id: 'a6', source: img.avatarA6 }, { id: 'a7', source: img.avatarJiyoon }, { id: 'a8', source: img.avatarA8 },
  { id: 'b1', source: img.avatarB1 }, { id: 'b2', source: img.avatarB2 }, { id: 'b3', source: img.avatarB3 }, { id: 'b4', source: img.avatarB4 },
];

// ON08 first recommendations
export const firstRecommendations = [
  { id: 'ines', quote: '“토요일 아침마다 시장에서 처음 보는 과일을 하나씩 사 봐요.”', english: false, name: 'Inés', meta: '발렌시아 9,900km · 교환 편지', avatar: img.avatarA3 },
  { id: 'tom', quote: '“I fix old bikes in my garage on rainy evenings.”', english: true, name: 'Tom', meta: '브리스톨 9,000km · 영어 편지', avatar: img.avatarA4 },
  { id: 'hanh', quote: '“After work I study English at a small café near the lake.”', english: true, name: 'Hanh', meta: '하노이 2,700km · 영어 편지', avatar: img.avatarA1 },
];
