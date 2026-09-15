import { Search } from "lucide-react";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";
import { Link } from "react-router-dom";

const NoResults = () => {
  const { language } = useLanguages();
  const title = isSpanishLang(language)
    ? "No se encontraron resultados"
    : "No results found";
  const description = isSpanishLang(language)
    ? "No encontramos lo que buscas. Prueba con otras palabras clave o revisa la ortografía."
    : "We couldn't find what you were looking for. Try other keywords or check your spelling.";

  return (
    <div className="flex flex-col items-center justify-center p-8 mt-8 space-y-4 text-center bg-surface-2 dark:bg-dark-surface-2 rounded-lg">
      <div className="p-4 bg-surface-3 dark:bg-dark-surface-3 rounded-full">
        <Search size={24} className="text-secondary dark:text-dark-secondary" aria-hidden="true" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-xl font-semibold text-text-high dark:text-dark-text-high">
          {title}
        </h2>
        <p className="text-text-low dark:text-dark-text-low">{description}</p>
      </div>

      <Link
        to="/"
        className="mt-4 px-5 py-2.5 rounded-full bg-accent-ink text-white font-semibold transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-accent dark:text-dark-bg-main dark:hover:bg-dark-primary dark:focus-visible:outline-dark-accent">
        {isSpanishLang(language) ? "Volver al inicio" : "Back to home"}
      </Link>
    </div>
  );
};

export { NoResults };
