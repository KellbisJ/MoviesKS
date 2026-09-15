import { useState } from "react";
import { ExternalLink, MessageSquareOff, Star } from "lucide-react";
import { AuthorReview } from "@/services/reviews/types";

/** Reviews longer than this start collapsed. */
const LONG_REVIEW = 700;

const StarRating = ({ rating, isEs }: { rating: number; isEs: boolean }) => {
  const outOfFive = rating / 2;
  return (
    <p className="flex items-center gap-2">
      <span className="flex" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => {
          const fill = Math.max(0, Math.min(1, outOfFive - i));
          return (
            <span key={i} className="relative h-4 w-4">
              <Star className="absolute inset-0 h-4 w-4 fill-current text-secondary/40 dark:text-dark-secondary/40" strokeWidth={0} />
              {fill >= 0.5 ? (
                <span className="absolute inset-0 overflow-hidden" style={{ width: fill >= 1 ? "100%" : "50%" }}>
                  <Star className="h-4 w-4 fill-current text-accent-ink dark:text-dark-accent" strokeWidth={0} />
                </span>
              ) : null}
            </span>
          );
        })}
      </span>
      <span className="text-sm font-semibold tabular-nums text-text-high dark:text-dark-text-high">
        <span className="sr-only">{isEs ? "Calificación: " : "Rating: "}</span>
        {rating}
        <span className="font-normal text-text-low dark:text-dark-text-low">/10</span>
      </span>
    </p>
  );
};

const ReviewCard = ({ review, isEs }: { review: AuthorReview; isEs: boolean }) => {
  const [expanded, setExpanded] = useState(false);
  const author = review.author_details.name || review.author;
  const long = review.content.length > LONG_REVIEW;
  const date = (value: string) =>
    new Date(value).toLocaleDateString(isEs ? "es-MX" : "en-US", { year: "numeric", month: "short", day: "numeric" });
  const edited = review.updated_at && review.updated_at.slice(0, 10) !== review.created_at.slice(0, 10);

  return (
    <article className="rounded-xl bg-surface-2 p-5 shadow-sm dark:bg-dark-surface-2 sm:p-6">
      <header className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {review.author_details.avatar_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w64_and_h64_face${review.author_details.avatar_path}`}
              alt=""
              loading="lazy"
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-3 text-lg font-semibold uppercase text-text-low dark:bg-dark-surface-3 dark:text-dark-text-low">
              {author.charAt(0)}
            </span>
          )}
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-text-high dark:text-dark-text-high">{author}</h3>
            {review.author_details.username && review.author_details.username !== author ? (
              <p className="truncate text-sm text-text-low dark:text-dark-text-low">@{review.author_details.username}</p>
            ) : null}
          </div>
        </div>
        <p className="shrink-0 text-right text-sm text-text-low dark:text-dark-text-low">
          <time dateTime={review.created_at}>{date(review.created_at)}</time>
          {edited ? <span className="block text-xs">{isEs ? "Editada" : "Edited"}</span> : null}
        </p>
      </header>

      {review.author_details.rating ? (
        <div className="mt-4">
          <StarRating rating={review.author_details.rating} isEs={isEs} />
        </div>
      ) : null}

      <p
        id={`review-${review.id}`}
        className={`mt-4 max-w-[70ch] whitespace-pre-line wrap-break-word leading-relaxed text-text-high dark:text-dark-text-high ${
          long && !expanded ? "line-clamp-6" : ""
        }`}>
        {review.content}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {long ? (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            aria-controls={`review-${review.id}`}
            className="rounded-full text-sm font-semibold text-accent-ink cursor-pointer underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-dark-accent dark:focus-visible:outline-dark-accent">
            {expanded ? (isEs ? "Mostrar menos" : "Show less") : isEs ? "Leer reseña completa" : "Read full review"}
          </button>
        ) : null}
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full text-sm text-text-low underline-offset-4 hover:text-accent-ink hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-dark-text-low dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent">
          {isEs ? "Ver en TMDB" : "View on TMDB"}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">{isEs ? "(abre en otra pestaña)" : "(opens in a new tab)"}</span>
        </a>
      </div>
    </article>
  );
};

const CreateMediaReviews = ({
  mediaReviews,
  isEs,
}: {
  mediaReviews: AuthorReview[];
  isEs: boolean;
}): React.JSX.Element => {
  if (mediaReviews.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-xl bg-surface-2 px-5 py-10 text-center text-text-low dark:bg-dark-surface-2 dark:text-dark-text-low">
        <MessageSquareOff className="h-8 w-8 text-secondary dark:text-dark-secondary" aria-hidden="true" />
        {isEs ? "Todavía nadie ha reseñado este título." : "No one has reviewed this title yet."}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <p className="mb-4 text-sm text-text-low dark:text-dark-text-low">
        {isEs
          ? `${mediaReviews.length} ${mediaReviews.length === 1 ? "reseña" : "reseñas"} de usuarios de TMDB`
          : `${mediaReviews.length} ${mediaReviews.length === 1 ? "review" : "reviews"} from TMDB users`}
      </p>
      <ul className="space-y-4">
        {mediaReviews.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} isEs={isEs} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CreateMediaReviews };
