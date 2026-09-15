import React from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Sun, Moon } from "lucide-react";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";

const ThemeBtn = (): React.JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  const isEs = isSpanishLang(useLanguages().language);
  return (
    <button
      type="button"
      className="p-1.5 bg-surface-1 dark:bg-dark-surface-1 rounded-lg text-text-low dark:text-dark-text-low hover:text-text-high dark:hover:text-dark-bg-main hover:bg-accent dark:hover:bg-dark-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent duration-200 cursor-pointer"
      onClick={() => setIsDarkMode(!isDarkMode)}
      aria-label={
        isDarkMode
          ? isEs ? "Cambiar a modo claro" : "Switch to light mode"
          : isEs ? "Cambiar a modo oscuro" : "Switch to dark mode"
      }>
      {isDarkMode ? (
        <Sun className="text-dark-accent" size={20} aria-hidden="true" />
      ) : (
        <Moon size={20} aria-hidden="true" />
      )}
    </button>
  );
};

export { ThemeBtn };
