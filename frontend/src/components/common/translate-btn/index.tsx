import { Languages } from "lucide-react";

const TranslateBtn = ({
  showLangSidebar,
  setShowLangSideBar,
}: {
  showLangSidebar: boolean;
  setShowLangSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      type="button"
      className={`cursor-pointer p-1.5 rounded-lg dark:text-dark-text-low hover:text-text-high hover:bg-accent transition-colors duration-200 ${
        showLangSidebar
          ? "bg-accent text-text-high"
          : "bg-surface-1 dark:bg-dark-surface-1 text-text-low"
      }`}
      aria-label={"translate"}
      onClick={() => {
        setShowLangSideBar(!showLangSidebar);
      }}>
      {<Languages size={20} />}
    </button>
  );
};

export { TranslateBtn };
