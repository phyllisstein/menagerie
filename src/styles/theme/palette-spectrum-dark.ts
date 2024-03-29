import chroma from 'chroma-js'
import * as R from 'ramda'

export const js = {
  gray50: chroma.rgb(29, 29, 29),
  gray75: chroma.rgb(38, 38, 38),
  gray100: chroma.rgb(50, 50, 50),
  gray200: chroma.rgb(63, 63, 63),
  gray300: chroma.rgb(84, 84, 84),
  gray400: chroma.rgb(112, 112, 112),
  gray500: chroma.rgb(144, 144, 144),
  gray600: chroma.rgb(178, 178, 178),
  gray700: chroma.rgb(209, 209, 209),
  gray800: chroma.rgb(235, 235, 235),
  gray900: chroma.rgb(255, 255, 255),
  red100: chroma.rgb(123, 0, 0),
  red200: chroma.rgb(141, 0, 0),
  red300: chroma.rgb(165, 0, 0),
  red400: chroma.rgb(190, 4, 3),
  red500: chroma.rgb(215, 25, 19),
  red600: chroma.rgb(234, 56, 41),
  red700: chroma.rgb(246, 88, 67),
  red800: chroma.rgb(255, 117, 94),
  red900: chroma.rgb(255, 149, 129),
  red1000: chroma.rgb(255, 176, 161),
  red1100: chroma.rgb(255, 201, 189),
  red1200: chroma.rgb(255, 222, 216),
  red1300: chroma.rgb(255, 241, 238),
  red1400: chroma.rgb(255, 255, 255),
  orange100: chroma.rgb(102, 37, 0),
  orange200: chroma.rgb(117, 45, 0),
  orange300: chroma.rgb(137, 55, 0),
  orange400: chroma.rgb(158, 66, 0),
  orange500: chroma.rgb(180, 78, 0),
  orange600: chroma.rgb(202, 93, 0),
  orange700: chroma.rgb(225, 109, 0),
  orange800: chroma.rgb(244, 129, 12),
  orange900: chroma.rgb(254, 154, 46),
  orange1000: chroma.rgb(255, 181, 88),
  orange1100: chroma.rgb(253, 206, 136),
  orange1200: chroma.rgb(255, 225, 179),
  orange1300: chroma.rgb(255, 242, 221),
  orange1400: chroma.rgb(255, 253, 249),
  yellow100: chroma.rgb(76, 54, 0),
  yellow200: chroma.rgb(88, 64, 0),
  yellow300: chroma.rgb(103, 76, 0),
  yellow400: chroma.rgb(119, 89, 0),
  yellow500: chroma.rgb(136, 104, 0),
  yellow600: chroma.rgb(155, 120, 0),
  yellow700: chroma.rgb(174, 137, 0),
  yellow800: chroma.rgb(192, 156, 0),
  yellow900: chroma.rgb(211, 174, 0),
  yellow1000: chroma.rgb(228, 194, 0),
  yellow1100: chroma.rgb(244, 213, 0),
  yellow1200: chroma.rgb(249, 232, 92),
  yellow1300: chroma.rgb(252, 246, 187),
  yellow1400: chroma.rgb(255, 255, 255),
  chartreuse100: chroma.rgb(48, 64, 0),
  chartreuse200: chroma.rgb(55, 74, 0),
  chartreuse300: chroma.rgb(65, 87, 0),
  chartreuse400: chroma.rgb(76, 102, 0),
  chartreuse500: chroma.rgb(89, 118, 0),
  chartreuse600: chroma.rgb(102, 136, 0),
  chartreuse700: chroma.rgb(117, 154, 0),
  chartreuse800: chroma.rgb(132, 173, 1),
  chartreuse900: chroma.rgb(148, 192, 8),
  chartreuse1000: chroma.rgb(166, 211, 18),
  chartreuse1100: chroma.rgb(184, 229, 37),
  chartreuse1200: chroma.rgb(205, 245, 71),
  chartreuse1300: chroma.rgb(231, 254, 154),
  chartreuse1400: chroma.rgb(255, 255, 255),
  celery100: chroma.rgb(0, 69, 10),
  celery200: chroma.rgb(0, 80, 12),
  celery300: chroma.rgb(0, 94, 14),
  celery400: chroma.rgb(0, 109, 15),
  celery500: chroma.rgb(0, 127, 15),
  celery600: chroma.rgb(0, 145, 18),
  celery700: chroma.rgb(4, 165, 30),
  celery800: chroma.rgb(34, 184, 51),
  celery900: chroma.rgb(68, 202, 73),
  celery1000: chroma.rgb(105, 220, 99),
  celery1100: chroma.rgb(142, 235, 127),
  celery1200: chroma.rgb(180, 247, 162),
  celery1300: chroma.rgb(221, 253, 211),
  celery1400: chroma.rgb(255, 255, 255),
  green100: chroma.rgb(4, 67, 41),
  green200: chroma.rgb(0, 78, 47),
  green300: chroma.rgb(0, 92, 56),
  green400: chroma.rgb(0, 108, 67),
  green500: chroma.rgb(0, 125, 78),
  green600: chroma.rgb(0, 143, 93),
  green700: chroma.rgb(18, 162, 108),
  green800: chroma.rgb(43, 180, 125),
  green900: chroma.rgb(67, 199, 143),
  green1000: chroma.rgb(94, 217, 162),
  green1100: chroma.rgb(129, 233, 184),
  green1200: chroma.rgb(177, 244, 209),
  green1300: chroma.rgb(223, 250, 234),
  green1400: chroma.rgb(254, 255, 252),
  seafoam100: chroma.rgb(18, 65, 63),
  seafoam200: chroma.rgb(14, 76, 73),
  seafoam300: chroma.rgb(4, 90, 87),
  seafoam400: chroma.rgb(0, 105, 101),
  seafoam500: chroma.rgb(0, 122, 117),
  seafoam600: chroma.rgb(0, 140, 135),
  seafoam700: chroma.rgb(0, 158, 152),
  seafoam800: chroma.rgb(3, 178, 171),
  seafoam900: chroma.rgb(54, 197, 189),
  seafoam1000: chroma.rgb(93, 214, 207),
  seafoam1100: chroma.rgb(132, 230, 223),
  seafoam1200: chroma.rgb(176, 242, 236),
  seafoam1300: chroma.rgb(223, 249, 246),
  seafoam1400: chroma.rgb(254, 255, 254),
  cyan100: chroma.rgb(0, 61, 98),
  cyan200: chroma.rgb(0, 71, 111),
  cyan300: chroma.rgb(0, 85, 127),
  cyan400: chroma.rgb(0, 100, 145),
  cyan500: chroma.rgb(0, 116, 162),
  cyan600: chroma.rgb(0, 134, 180),
  cyan700: chroma.rgb(0, 153, 198),
  cyan800: chroma.rgb(14, 173, 215),
  cyan900: chroma.rgb(44, 193, 230),
  cyan1000: chroma.rgb(84, 211, 241),
  cyan1100: chroma.rgb(127, 228, 249),
  cyan1200: chroma.rgb(167, 241, 255),
  cyan1300: chroma.rgb(215, 250, 255),
  cyan1400: chroma.rgb(255, 255, 255),
  blue100: chroma.rgb(0, 56, 119),
  blue200: chroma.rgb(0, 65, 138),
  blue300: chroma.rgb(0, 77, 163),
  blue400: chroma.rgb(0, 89, 194),
  blue500: chroma.rgb(3, 103, 224),
  blue600: chroma.rgb(19, 121, 243),
  blue700: chroma.rgb(52, 143, 244),
  blue800: chroma.rgb(84, 163, 246),
  blue900: chroma.rgb(114, 183, 249),
  blue1000: chroma.rgb(143, 202, 252),
  blue1100: chroma.rgb(174, 219, 254),
  blue1200: chroma.rgb(204, 233, 255),
  blue1300: chroma.rgb(232, 246, 255),
  blue1400: chroma.rgb(255, 255, 255),
  indigo100: chroma.rgb(40, 44, 140),
  indigo200: chroma.rgb(47, 52, 163),
  indigo300: chroma.rgb(57, 63, 187),
  indigo400: chroma.rgb(70, 75, 211),
  indigo500: chroma.rgb(85, 91, 231),
  indigo600: chroma.rgb(104, 109, 244),
  indigo700: chroma.rgb(124, 129, 251),
  indigo800: chroma.rgb(145, 149, 255),
  indigo900: chroma.rgb(167, 170, 255),
  indigo1000: chroma.rgb(188, 190, 255),
  indigo1100: chroma.rgb(208, 210, 255),
  indigo1200: chroma.rgb(226, 228, 255),
  indigo1300: chroma.rgb(243, 243, 254),
  indigo1400: chroma.rgb(255, 255, 255),
  purple100: chroma.rgb(76, 13, 157),
  purple200: chroma.rgb(89, 17, 177),
  purple300: chroma.rgb(105, 28, 200),
  purple400: chroma.rgb(122, 45, 218),
  purple500: chroma.rgb(140, 65, 233),
  purple600: chroma.rgb(157, 87, 243),
  purple700: chroma.rgb(172, 111, 249),
  purple800: chroma.rgb(187, 135, 251),
  purple900: chroma.rgb(202, 159, 252),
  purple1000: chroma.rgb(215, 182, 254),
  purple1100: chroma.rgb(228, 204, 254),
  purple1200: chroma.rgb(239, 223, 255),
  purple1300: chroma.rgb(249, 240, 255),
  purple1400: chroma.rgb(255, 253, 255),
  fuchsia100: chroma.rgb(107, 3, 106),
  fuchsia200: chroma.rgb(123, 0, 123),
  fuchsia300: chroma.rgb(144, 0, 145),
  fuchsia400: chroma.rgb(165, 13, 166),
  fuchsia500: chroma.rgb(185, 37, 185),
  fuchsia600: chroma.rgb(205, 57, 206),
  fuchsia700: chroma.rgb(223, 81, 224),
  fuchsia800: chroma.rgb(235, 110, 236),
  fuchsia900: chroma.rgb(244, 140, 242),
  fuchsia1000: chroma.rgb(250, 168, 245),
  fuchsia1100: chroma.rgb(254, 194, 248),
  fuchsia1200: chroma.rgb(255, 219, 250),
  fuchsia1300: chroma.rgb(255, 239, 252),
  fuchsia1400: chroma.rgb(255, 253, 255),
  magenta100: chroma.rgb(118, 0, 58),
  magenta200: chroma.rgb(137, 0, 66),
  magenta300: chroma.rgb(160, 0, 77),
  magenta400: chroma.rgb(182, 18, 90),
  magenta500: chroma.rgb(203, 38, 109),
  magenta600: chroma.rgb(222, 61, 130),
  magenta700: chroma.rgb(237, 87, 149),
  magenta800: chroma.rgb(249, 114, 167),
  magenta900: chroma.rgb(255, 143, 185),
  magenta1000: chroma.rgb(255, 172, 202),
  magenta1100: chroma.rgb(255, 198, 218),
  magenta1200: chroma.rgb(255, 221, 233),
  magenta1300: chroma.rgb(255, 240, 245),
  magenta1400: chroma.rgb(255, 252, 253),
}

export type JS = typeof js
export type ColorNames = keyof JS
export type CSS = { [k in ColorNames]: string }

export const css: CSS = R.map(R.invoker(0, 'css'), js)
