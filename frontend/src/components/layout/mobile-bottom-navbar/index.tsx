import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Globe,
  Settings,
  User,
  House,
  Film,
  Tv,
  Save,
  Search,
} from "lucide-react";
import { ThemeBtn } from "@/components/common/theme-btn";
import { TranslateBtn } from "@/components/common/translate-btn";
import { LanguagesSideBar } from "@/components/common/languages-sidebar";
import { useEffect, useState } from "react";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";
import { underlinePath } from "@/utils/underline-path";
import { handleSearch2 } from "@/utils/handle-search";
import { useSearch } from "@/context/search-media-context";
import { MediaTypeT } from "@/types/media-type";

const MobileBottomNavBar = (): React.JSX.Element => {
  const { language } = useLanguages();
  const location = useLocation();
  const { searchQuery, updateSearchQuery, updateMediaType, mediaType } =
    useSearch();

  const navigate = useNavigate();

  const [showNavigationPathsBottomMenu, setShowNavigationPathsBottomMenu] =
    useState(false);
  const [showSettingsBottomMenu, setShowSettingsBottomMenu] = useState(false);
  const [showLangSidebar, setShowLangSideBar] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const [labels, setLabels] = useState<{
    home: string;
    movies: string;
    tv: string;
    saved: string;
  }>({
    home: "Inicio",
    movies: "Películas",
    tv: "Series de TV",
    saved: "Guardado",
  });

  useEffect(() => {
    if (!isSpanishLang(language)) {
      setLabels((prevLabels) => ({
        ...prevLabels,
        home: "Home",
        movies: "Movies",
        tv: "TV Series",
        saved: "Saved",
      }));
    }
  }, [language]);

  const navItems = [
    {
      to: "/",
      base: "/",
      label: labels.home,
      icon: House,
    },
    {
      to: location.pathname.startsWith("/movie") ? "/movie/all" : "/movie",
      base: "/movie",
      label: labels.movies,
      icon: Film,
    },
    {
      to: location.pathname.startsWith("/tv") ? "/tv/all" : "/tv",
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
    <nav className="fixed bottom-0 h-12 w-full bg-surface-1 dark:bg-dark-surface-1 backdrop-blur-sm shadow-md z-100 lg:hidden">
      {/* Navbar accessibility menu */}
      <div className="flex justify-around w-full h-full items-center text-text-low dark:text-dark-text-low">
        <Globe
          size={21}
          onClick={() => {
            setShowNavigationPathsBottomMenu((prev) => !prev);
            setShowSettingsBottomMenu(false);
            setShowLangSideBar(false);
            setShowSearchBar(false);
          }}
          aria-label="navigation"
        />
        <Settings
          size={21}
          onClick={() => {
            setShowSettingsBottomMenu((prev) => !prev);
            setShowNavigationPathsBottomMenu(false);
            setShowSearchBar(false);
            setShowLangSideBar(false);
          }}
          aria-label="settings"
        />
      </div>

      {/* Navigation Menu Overlay */}
      <div
        className={`fixed bottom-12 left-0 right-0 h-12 bg-surface-1 dark:bg-dark-surface-1 transition-all duration-300 ease-out ${
          showNavigationPathsBottomMenu
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}>
        <div className="flex gap-3 w-full h-full items-center justify-center px-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 text-xs transition-colors duration-200 ${
                underlinePath(item.base, location)
                  ? "text-accent dark:text-dark-accent"
                  : "text-text-low dark:text-dark-text-low hover:text-accent dark:hover:text-dark-accent"
              }`}
              aria-label={item.label}>
              <item.icon size={18} className="shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
          <div
            className={`flex flex-col items-center gap-1 text-xs transition-colors duration-200 ${
              underlinePath("/search", location)
                ? "text-accent dark:text-dark-accent"
                : "text-text-low dark:text-dark-text-low"
            } `}
            onClick={() => {
              setShowSearchBar((prev) => !prev);
              setShowSettingsBottomMenu(false);
              setShowNavigationPathsBottomMenu(false);
              setShowLangSideBar(false);
            }}>
            <Search size={18} className="shrink-0" />
            <span>{`${isSpanishLang(language) ? "Buscar" : "Search"}`}</span>
          </div>
        </div>
      </div>

      {/* Settings Menu Overlay */}
      <div
        className={`fixed bottom-12 left-0 right-0 h-12 bg-surface-1 dark:bg-dark-surface-1 transition-all duration-300 ease-out ${
          showSettingsBottomMenu
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}>
        <div className="flex justify-between items-center h-full px-8">
          <ThemeBtn />
          <div className="relative">
            <TranslateBtn
              showLangSidebar={showLangSidebar}
              setShowLangSideBar={setShowLangSideBar}
            />
            <div
              className={`absolute bottom-80 -right-4 rounded-lg shadow-lg transition-all duration-200 ease-out bg-surface-1 dark:bg-dark-surface-1 ${
                showLangSidebar
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}>
              <LanguagesSideBar />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`fixed bottom-12 left-0 right-0 h-12 bg-surface-1 dark:bg-dark-surface-1 transition-all duration-300 ease-out ${
          showSearchBar
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}>
        <div className="flex justify-center items-center h-full px-2">
          <form
            onSubmit={(e) => handleSearch2(e, searchQuery, mediaType, navigate)}
            className="relative flex items-center w-4/5 max-w-xl bg-surface-2 dark:bg-dark-surface-2 rounded-full transition-all focus-within:ring-2 focus-within:ring-accent dark:focus-within:ring-dark-accent">
            <input
              type="text"
              placeholder={`Search ${mediaType === MediaTypeT.movie ? "Movies" : "TV Series"}`}
              className="w-full px-6 py-2 bg-transparent outline-none rounded-full placeholder-text-low dark:placeholder-dark-text-low text-sm transition-all text-text-high dark:text-dark-text-high"
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              name="BottomNavbarInputSearchMedia"
            />
            <button
              type="submit"
              className="p-2 mr-2 rounded-full hover:bg-surface-2 dark:hover:bg-dark-surface-2 transition-colors">
              <Search
                size={20}
                className="text-text-low dark:text-dark-text-low"
              />
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export { MobileBottomNavBar };
