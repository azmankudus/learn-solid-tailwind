import { lang } from "./store";
import { enUS } from "./messages/en-US";
import { msMY } from "./messages/ms-MY";
import { zhCN } from "./messages/zh-CN";
import { ICON_FLAG_US, ICON_FLAG_MY, ICON_FLAG_CN } from "./icons";

const messages: Record<string, Record<string, string>> = {
  "en-US": enUS,
  "ms-MY": msMY,
  "zh-CN": zhCN
};

export const LANGUAGES = [
  { value: "en-US", label: "English (US)", icon: ICON_FLAG_US },
  { value: "ms-MY", label: "Bahasa Melayu", icon: ICON_FLAG_MY },
  { value: "zh-CN", label: "中文", icon: ICON_FLAG_CN }
];

export function text(key: string): string {
  const currentLang = lang() || "en-US";
  return messages[currentLang]?.[key] || messages["en-US"][key] || key;
}
