import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { Search } from "lucide-react";
import { handleSearch } from "@/utils/handle-search";

const SearchBar = (): React.JSX.Element => {
  const { language } = useLanguages();
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <form
      onSubmit={(e) => handleSearch(e, query, navigate)}
      className="max-w-3xl mx-auto relative">
      <div className="flex items-center bg-surface-2 dark:bg-dark-surface-2 rounded-full px-6 py-4 border border-surface-1 dark:border-dark-surface-1">
        <input
          type="text"
          placeholder={`${
            isSpanishLang(language)
              ? "Busca películas, series..."
              : "Search for movies, series..."
          }`}
          className="w-full bg-transparent border-none focus:ring-0 text-text-high dark:text-dark-text-high placeholder-text-low dark:placeholder-dark-text-low outline-none no-underline pr-2"
          onChange={handleInputChange}
          name="bigSearchBarForm"
        />
        <button
          type="submit"
          className="w-6 h-6 text-text-low dark:text-dark-text-low"
          aria-label={isSpanishLang(language) ? "Buscar" : "Search"}>
          <Search size={22} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};

export { SearchBar };
