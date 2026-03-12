import { lang } from "./store";
import { enUS } from "./messages/en-US";
import { msMY } from "./messages/ms-MY";
import { zhCN } from "./messages/zh-CN";
import { koKR } from "./messages/ko-KR";
import { jaJP } from "./messages/ja-JP";
import { ruRU } from "./messages/ru-RU";
import { arSA } from "./messages/ar-SA";
import { thTH } from "./messages/th-TH";
import { deDE } from "./messages/de-DE";
import { elGR } from "./messages/el-GR";
import { ICON_FLAG_US, ICON_FLAG_MY, ICON_FLAG_CN, ICON_FLAG_KR, ICON_FLAG_JP, ICON_FLAG_RU, ICON_FLAG_SA, ICON_FLAG_TH, ICON_FLAG_DE, ICON_FLAG_GR } from "./icons";

const messages: Record<string, Record<string, string>> = {
  "en-US": enUS,
  "ms-MY": msMY,
  "zh-CN": zhCN,
  "ko-KR": koKR,
  "ja-JP": jaJP,
  "ru-RU": ruRU,
  "ar-SA": arSA,
  "th-TH": thTH,
  "de-DE": deDE,
  "el-GR": elGR
};

export const LANGUAGES = [
  { value: "en-US", label: "English (US)", icon: ICON_FLAG_US },
  { value: "ms-MY", label: "Bahasa Melayu", icon: ICON_FLAG_MY },
  { value: "zh-CN", label: "中文 (中国)", icon: ICON_FLAG_CN },
  { value: "ko-KR", label: "한국어", icon: ICON_FLAG_KR },
  { value: "ja-JP", label: "日本語", icon: ICON_FLAG_JP },
  { value: "ru-RU", label: "Русский", icon: ICON_FLAG_RU },
  { value: "ar-SA", label: "العربية", icon: ICON_FLAG_SA },
  { value: "th-TH", label: "ไทย", icon: ICON_FLAG_TH },
  { value: "de-DE", label: "Deutsch", icon: ICON_FLAG_DE },
  { value: "el-GR", label: "Ελληνικά", icon: ICON_FLAG_GR }
];

export function text(key: string): string {
  const currentLang = lang() || "en-US";
  return messages[currentLang]?.[key] || messages["en-US"][key] || key;
}
