// Design tokens — Figma variables `Mingpal / Paper` (file hh7ZlihbABvtoYeUifdKpG)
export const colors = {
  ink: '#22201c',
  ink2: '#46423b',
  sub: '#5a564e',
  paper: '#f2eee9',
  paper2: '#e6e1d6',
  card: '#fbf9f3',
  light: '#f6f2ea',
  lineSoft: '#e2ddd1',
  lineMid: '#d9d3c6',
  line: '#cfc8b8',
  lineStrong: '#bdb6a6',
  red: '#9c3f2b',
  olive: '#4b5536',
} as const;

export const fonts = {
  prRegular: 'Pretendard-Regular',
  prMedium: 'Pretendard-Medium',
  prSemiBold: 'Pretendard-SemiBold',
  maruBold: 'MaruBuri-Bold',
  newsRegular: 'Newsreader_400Regular',
  newsMedium: 'Newsreader_500Medium',
  newsSemiBold: 'Newsreader_600SemiBold',
} as const;

/** Text styles taken from Figma text styles (size / line height). */
export const type = {
  title: { fontFamily: fonts.maruBold, fontSize: 28, lineHeight: 34 },
  titleEn: { fontFamily: fonts.newsSemiBold, fontSize: 28, lineHeight: 34 },
  maru18: { fontFamily: fonts.maruBold, fontSize: 18, lineHeight: 26 },
  maru16: { fontFamily: fonts.maruBold, fontSize: 16, lineHeight: 24 },
  name: { fontFamily: fonts.newsMedium, fontSize: 20, lineHeight: 26 },
  news16: { fontFamily: fonts.newsRegular, fontSize: 16, lineHeight: 21 },
  news16Loose: { fontFamily: fonts.newsRegular, fontSize: 16, lineHeight: 27 },
  news14: { fontFamily: fonts.newsRegular, fontSize: 14, lineHeight: 18 },
  news20: { fontFamily: fonts.newsRegular, fontSize: 20, lineHeight: 30 },
  body16: { fontFamily: fonts.prRegular, fontSize: 16, lineHeight: 28 },
  body14: { fontFamily: fonts.prRegular, fontSize: 14, lineHeight: 22 },
  body14Tight: { fontFamily: fonts.prRegular, fontSize: 14, lineHeight: 18 },
  body14Medium: { fontFamily: fonts.prMedium, fontSize: 14, lineHeight: 18 },
  strong14: { fontFamily: fonts.prSemiBold, fontSize: 14, lineHeight: 18 },
  strong15: { fontFamily: fonts.prSemiBold, fontSize: 15, lineHeight: 20 },
  strong16: { fontFamily: fonts.prSemiBold, fontSize: 16, lineHeight: 20 },
  medium16: { fontFamily: fonts.prMedium, fontSize: 16, lineHeight: 22 },
  caption13: { fontFamily: fonts.prRegular, fontSize: 13, lineHeight: 18 },
  meta12: { fontFamily: fonts.prRegular, fontSize: 12, lineHeight: 16 },
  meta12Medium: { fontFamily: fonts.prMedium, fontSize: 12, lineHeight: 16 },
  meta12Strong: { fontFamily: fonts.prSemiBold, fontSize: 12, lineHeight: 16 },
} as const;

export const layout = {
  screenPadding: 24,
  touch: 44, // minimum touch target (spec §13)
  tabBarHeight: 84,
} as const;
