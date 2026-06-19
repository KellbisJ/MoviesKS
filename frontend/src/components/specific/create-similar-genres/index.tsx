import React from "react";
import { Link } from "react-router-dom";
import { CreateSimilarGenresInterface } from "./types";

const CreateSimilarGenres: React.FC<CreateSimilarGenresInterface> = ({
  genres,
  type,
}) => {
  return genres.map((genre) => (
    <Link
      key={genre.id}
      to={`/${type}/all/category/${genre.id}`}
      className="p-2 min-w-40 w-40 text-sm text-center rounded-full bg-surface-2 dark:bg-dark-surface-2 hover:bg-accent dark:hover:bg-dark-accent transition-colors">
      {genre.name}
    </Link>
  ));
};

export { CreateSimilarGenres };
