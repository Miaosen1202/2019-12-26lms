import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import ruLocale from "element-ui/lib/locale/lang/ru-RU";
import frLocale from "element-ui/lib/locale/lang/fr";
import en from "./en";
import zh from "./zh";
import ru from "./ru";
import fr from "./fr";

export default {
    en: Object.assign(en, enLocale),
    zh: Object.assign(zh, zhLocale),
    ru: Object.assign(ru, ruLocale),
    fr: Object.assign(fr, frLocale)
};
