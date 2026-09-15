import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSearch } from "../../../context/search-media-context";
import { useDarkMode } from "../../../hooks/use-dark-mode";
import { NavBarPropsInterface } from "./types";
import {
  House,
  Film,
  Tv,
  Bookmark,
  Sun,
  Moon,
  PanelLeftOpen,
  PanelLeftClose,
  Search,
  TextSearch,
  CircleX,
  Languages,
} from "lucide-react";
import { MediaTypeT } from "@/types/media-type";

import { LanguagesSideBar } from "@/components/common/languages-sidebar";
import { MobileBottomNavBar } from "../mobile-bottom-navbar";
import { handleSearch2 } from "@/utils/handle-search";
import { Scroll0 } from "@/utils/scroll-0";
import { TranslateBtn } from "@/components/common/translate-btn";
import { ThemeBtn } from "@/components/common/theme-btn";
import { underlinePath } from "@/utils/underline-path";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";

const NavBar: React.FC<NavBarPropsInterface> = ({
  isMobile,
  toggleSideBar,
  isSideBarOpen,
  setIsSideBarOpen,
  showLangSidebar,
  setShowLangSideBar,
}) => {
  const { language } = useLanguages();
  const { searchQuery, updateSearchQuery, updateMediaType, mediaType } =
    useSearch();

  const location = useLocation();
  const navigate = useNavigate();

  const isEs = isSpanishLang(language);
  const labels = {
    home: isEs ? "Inicio" : "Home",
    movies: isEs ? "Películas" : "Movies",
    tv: isEs ? "Series de TV" : "TV Series",
    saved: isEs ? "Guardado" : "Saved",
    search: isEs ? "Buscar" : "Search",
  };

  useEffect(() => {
    updateMediaType(
      location.pathname.includes("/tv") ? MediaTypeT.tv : MediaTypeT.movie
    );
  }, [location, updateMediaType]);

  useEffect(() => {
    Scroll0();
  }, []);

  const navItems = [
    { to: "/home", base: "/home", label: labels.home, icon: House },
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
      <nav className="hidden lg:flex justify-between items-center fixed top-0 w-full px-8 bg-surface-3/80 dark:bg-dark-surface-3/80 backdrop-blur-sm z-1000 shadow-md h-16 text-text-high dark:text-dark-text-high transition">
        <div className="flex items-center gap-6 xl:gap-8 flex-1">
          <Link to="/" className="text-2xl font-bold">
            <span className="flex items-center gap-2">
              <Film size={24} />
              MoviesKS
            </span>
          </Link>

          <div className="flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={underlinePath(item.base, location) ? "page" : undefined}
                className={`flex items-center gap-2 rounded-sm transition-colors duration-200 text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent dark:focus-visible:outline-dark-accent ${
                  underlinePath(item.base, location)
                    ? "text-accent-ink dark:text-dark-accent"
                    : "text-text-low dark:text-dark-text-low hover:text-accent-ink dark:hover:text-dark-accent"
                }`}>
                <item.icon size={18} className="shrink-0" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 xl:gap-6 flex-1 justify-end">
          <form
            onSubmit={(e) => handleSearch2(e, searchQuery, mediaType, navigate)}
            className="relative flex items-center w-4/5 max-w-xl bg-surface-1 dark:bg-dark-surface-1 rounded-full transition-all focus-within:ring-2 focus-within:ring-accent">
            <input
              type="search"
              aria-label={labels.search}
              placeholder={
                mediaType === MediaTypeT.movie
                  ? isEs ? "Buscar películas" : "Search movies"
                  : isEs ? "Buscar series" : "Search TV series"
              }
              className="w-full px-6 py-2 bg-transparent outline-none rounded-full placeholder-text-low dark:placeholder-dark-text-low text-sm transition-all"
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              name="2ndNavbarInputSearchMedia"
            />
            <button
              type="submit"
              aria-label={labels.search}
              className="p-2 mr-2 rounded-full hover:bg-surface-2 dark:hover:bg-dark-surface-2 transition-colors">
              <Search
                size={20}
                className="text-text-low dark:text-dark-text-low"
              />
            </button>
          </form>

          <TranslateBtn
            showLangSidebar={showLangSidebar}
            setShowLangSideBar={setShowLangSideBar}
          />

          <ThemeBtn />

          <div
            className={`absolute top-6 right-8 rounded-lg shadow-lg transition-all duration-200 ease-out ${
              showLangSidebar
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}>
            {<LanguagesSideBar />}
          </div>
        </div>
      </nav>
      <MobileBottomNavBar />
    </>
  );
};

export { NavBar };
