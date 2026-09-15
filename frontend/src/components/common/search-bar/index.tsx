import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { Search } from "lucide-react";
import { handleSearch } from "@/utils/handle-search";

const SearchBar = (): React.JSX.Element => {
  const { language } = useLanguages();
  const isEs = isSpanishLang(language);
  const [query, setQuery] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (isInvalid) setIsInvalid(false);
  };

  return (
    <form
      role="search"
      onSubmit={(e) => setIsInvalid(!handleSearch(e, query, navigate))}
      className="max-w-3xl mx-auto relative">
      <div className="flex items-center gap-2 bg-surface-3 dark:bg-dark-surface-2 rounded-full pl-6 pr-2 py-2 shadow-lg transition-shadow duration-200 focus-within:ring-2 focus-within:ring-accent dark:focus-within:ring-dark-accent">
        <input
          type="search"
          enterKeyHint="search"
          aria-label={isEs ? "Buscar películas y series" : "Search movies and TV series"}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? "big-search-hint" : undefined}
          placeholder={isEs ? "Busca películas, series…" : "Search for movies, series…"}
          className="w-full min-w-0 bg-transparent py-2 text-base text-text-high dark:text-dark-text-high placeholder-text-low dark:placeholder-dark-text-low outline-none [&::-webkit-search-cancel-button]:hidden"
          value={query}
          onChange={handleInputChange}
          name="bigSearchBarForm"
        />
        <button
          type="submit"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-text-low dark:text-dark-text-low cursor-pointer transition-colors duration-200 hover:bg-accent-ink hover:text-white dark:hover:bg-dark-accent dark:hover:text-dark-bg-main focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={isEs ? "Buscar" : "Search"}>
          <Search size={20} aria-hidden="true" />
        </button>
      </div>
      {isInvalid ? (
        <p
          id="big-search-hint"
          role="status"
          className="mt-2 px-6 text-sm text-text-low dark:text-dark-text-low">
          {isEs
            ? "Escribe al menos una letra o número para buscar."
            : "Type at least one letter or number to search."}
        </p>
      ) : null}
    </form>
  );
};

export { SearchBar };
