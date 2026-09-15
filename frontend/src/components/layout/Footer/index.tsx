import { Link } from "react-router-dom";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { useLanguages } from "@/context/lang";

const Footer = (): React.JSX.Element => {
  const { language } = useLanguages();
  const isEs = isSpanishLang(language);

  const exploreLinks = [
    { to: "/movie", label: isEs ? "Películas" : "Movies" },
    { to: "/tv", label: isEs ? "Series de TV" : "TV Series" },
    { to: "/saved-media", label: isEs ? "Tus guardados" : "Your saved titles" },
  ];

  const linkClasses =
    "rounded-full underline-offset-4 transition-colors duration-200 hover:text-accent-ink hover:underline dark:hover:text-dark-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:focus-visible:outline-dark-accent";

  return (
    <footer className="w-full bg-bg-main px-4 pt-12 pb-20 text-sm text-text-low transition-colors dark:bg-dark-bg-main dark:text-dark-text-low lg:pb-10">
      <div className="container mx-auto flex flex-col items-center gap-6 text-center">
        <nav aria-label={isEs ? "Seguir explorando" : "Keep exploring"}>
          <p className="mb-3 text-base font-semibold text-text-high dark:text-dark-text-high">
            {isEs ? "¿Aún no encuentras qué ver?" : "Still looking for something to watch?"}
          </p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {exploreLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClasses}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-1">
          <p className="m-0">
            {isEs ? "Datos de" : "Data from"}{" "}
            <a
              href="https://www.themoviedb.org/documentation/api"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}>
              TheMovieDB API
            </a>
          </p>
          <p className="m-0">
            © Kellbis Salazar ·{" "}
            <a
              href="https://github.com/KellbisJ/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClasses}>
              GitHub
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
