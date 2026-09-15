import React from "react";
import { Link } from "react-router-dom";
import { CreateSimilarGenresInterface } from "./types";

/** Genre chips as list items; each opens the browse page filtered to that genre. */
const CreateSimilarGenres: React.FC<CreateSimilarGenresInterface> = ({
  genres,
  type,
}) => {
  return genres.map((genre) => (
    <li key={genre.id}>
      <Link
        to={`/${type}?genres=${genre.id}`}
        className="inline-flex h-10 items-center rounded-full bg-surface-2 px-4 text-sm font-medium text-text-high transition-colors duration-200 hover:bg-accent-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-surface-2 dark:text-dark-text-high dark:hover:bg-dark-accent dark:hover:text-dark-bg-main dark:focus-visible:outline-dark-accent">
        {genre.name}
      </Link>
    </li>
  ));
};

export { CreateSimilarGenres };
