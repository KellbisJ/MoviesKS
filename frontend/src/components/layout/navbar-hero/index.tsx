import { Link, useLocation } from "react-router-dom";
import { House, Film, Tv, Bookmark } from "lucide-react";
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

  const isEs = isSpanishLang(language);
  const labels = {
    home: isEs ? "Inicio" : "Home",
    movies: isEs ? "Películas" : "Movies",
    tv: isEs ? "Series de TV" : "TV Series",
    saved: isEs ? "Guardado" : "Saved",
  };

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
      icon: Bookmark,
    },
  ];

  return (
    <>
      {/* Desktop*/}
      {/* relative z-50: the in-flow navbar must stack above the home lead feature so the language dropdown isn't covered */}
      <nav className="hidden lg:block relative z-50 bg-bg-main dark:bg-dark-bg-main transition-colors duration-300 h-12 sm:h-14 w-full">
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
                      ? "text-accent-ink dark:text-dark-accent"
                      : "text-text-low dark:text-dark-text-low hover:text-accent dark:hover:text-dark-accent"
                  } focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent dark:focus-visible:outline-dark-accent rounded-sm`}
                  aria-current={underlinePath(item.base, location) ? "page" : undefined}>
                  <item.icon size={20} className="shrink-0" aria-hidden="true" />
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
