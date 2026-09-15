import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { Languages } from "lucide-react";

const TranslateBtn = ({
  showLangSidebar,
  setShowLangSideBar,
}: {
  showLangSidebar: boolean;
  setShowLangSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isEs = isSpanishLang(useLanguages().language);
  return (
    <button
      type="button"
      className={`cursor-pointer p-1.5 rounded-lg dark:text-dark-text-low hover:text-text-high hover:bg-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent ${
        showLangSidebar
          ? "bg-accent text-text-high"
          : "bg-surface-1 dark:bg-dark-surface-1 text-text-low"
      }`}
      aria-label={isEs ? "Idioma" : "Language"}
      aria-expanded={showLangSidebar}
      onClick={() => {
        setShowLangSideBar(!showLangSidebar);
      }}>
      <Languages size={20} aria-hidden="true" />
    </button>
  );
};

export { TranslateBtn };
