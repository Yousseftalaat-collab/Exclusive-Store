import { create } from "zustand";
import { persist } from "zustand/middleware";
import i18n from "../i18n";

type Language = "en" | "ar" | "es";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (lang: Language) => {
        i18n.changeLanguage(lang);
        // Set dir attribute for RTL support
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;
        set({ language: lang });
      },
    }),
    {
      name: "language-storage",
      onRehydrateStorage: () => (state) => {
        // Apply language and direction on page load
        if (state) {
          i18n.changeLanguage(state.language);
          document.documentElement.dir =
            state.language === "ar" ? "rtl" : "ltr";
          document.documentElement.lang = state.language;
        }
      },
    },
  ),
);
