import React from "react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { Sun, Moon } from "lucide-react";

const ThemeBtn = (): React.JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  return (
    <button
      type="button"
      className="p-1.5 bg-surface-1 dark:bg-dark-surface-1 rounded-lg text-text-low dark:text-dark-text-low hover:text-text-high hover:bg-accent transition-colors duration-200 cursor-pointer"
      onClick={() => setIsDarkMode(!isDarkMode)}
      aria-label={isDarkMode ? "Light mode" : "Dark mode"}>
      {isDarkMode ? (
        <Sun className="text-accent" size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
};

export { ThemeBtn };
