import { Link, useLocation } from "react-router-dom";
import { Globe, Settings, User, House, Film, Tv, Save } from "lucide-react";
import { LanguagesSideBar } from "@/components/common/languages-sidebar";
import { useEffect, useState } from "react";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";
import { ThemeBtn } from "@/components/common/theme-btn";
import { TranslateBtn } from "@/components/common/translate-btn";
import { MobileBottomNavBar } from "../mobile-bottom-navbar";
import { Scroll0 } from "@/utils/scroll-0";
import { underlinePath } from "@/utils/underline-path";

const NavbarHero = (): React.JSX.Element => {
  const { language } = useLanguages();
  const location = useLocation();

  const [showLangSidebar, setShowLangSideBar] = useState<boolean>(false);

  const [labels, setLabels] = useState<{
    home: string;
    movies: string;
    tv: string;
    saved: string;
    search: string;
  }>({
    home: "Inicio",
    movies: "Películas",
    tv: "Series de TV",
    saved: "Guardado",
    search: "Buscar",
  });

  useEffect(() => {
    if (!isSpanishLang(language)) {
      setLabels((prevLabels) => ({
        ...prevLabels,
        home: "Home",
        movies: "Movies",
        tv: "TV Series",
        saved: "Saved",
        search: "Search",
      }));
    }
  }, [language]);

  useEffect(() => {
    Scroll0();
  }, []);

  const navItems = [
    {
      to: "/",
      base: "/",
      label: labels.home,
      icon: House,
    },
    {
      to: "/movie",
      base: "/movie",
      label: labels.movies,
      icon: Film,
    },
    {
      to: "/tv",
      base: "/tv",
      label: labels.tv,
      icon: Tv,
    },
    {
      to: "/saved-media",
      base: "/saved-media",
      label: labels.saved,
      icon: Save,
    },
  ];

  return (
    <>
      {/* Desktop*/}
      <nav className="hidden lg:block bg-bg-main dark:bg-dark-bg-main transition-colors duration-300 h-12 sm:h-14 w-full">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-start sm:items-center sm:justify-between">
            <span className="hidden sm:block text-xl font-bold text-text-high dark:text-dark-text-high transition-colors duration-300">
              <Link to="/">MoviesKS</Link>
            </span>

            {/* Desktop Navigation (center) */}
            <div className="hidden sm:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2 transition-colors duration-200 text-sm ${
                    underlinePath(item.base, location)
                      ? "text-accent dark:text-dark-accent"
                      : "text-text-low dark:text-dark-text-low hover:text-accent dark:hover:text-dark-accent"
                  }`}
                  aria-label={item.label}>
                  <item.icon size={20} className="shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Right side (desktop) */}
            <div className="hidden sm:flex items-start sm:items-center gap-2 sm:gap-3 relative">
              <TranslateBtn
                showLangSidebar={showLangSidebar}
                setShowLangSideBar={setShowLangSideBar}
              />
              <ThemeBtn />

              <div
                className={`absolute top-0 right-0 rounded-lg shadow-lg transition-all duration-200 ease-out bg-surface-1 dark:bg-dark-surface-1 ${
                  showLangSidebar
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}>
                {<LanguagesSideBar />}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile*/}
      <MobileBottomNavBar />
    </>
  );
};

export { NavbarHero };
