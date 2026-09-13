import React, { memo } from "react";
import { LazyMediaContainer } from "@/components/common/lazy-media-container";
import { WithSkeleton } from "@/components/utilities/loading-skeletons/WithSkeleton";
import { HomeViewContentInterfaceProps } from "./types";
import { MksHeaderContent } from "@/components/common/mks-header-content";
import { SearchBar } from "@/components/common/search-bar";
import { Link } from "react-router-dom";
import { Star, ChevronRight, ChevronLeft, TriangleAlert } from "lucide-react";
import { useLanguages } from "@/context/lang";
import { isSpanishLang } from "@/utils/is-spanish-lang";
import { mediaImageSrc } from "@/utils/media-image-src";

const HomeViewContent: React.FC<HomeViewContentInterfaceProps> = memo(
  ({
    isLoadingMedia,
    isErrorCatched,
    mediaSectionData,
  }) => {
    const { language } = useLanguages();
    const isEs = isSpanishLang(language);
    return (
      <>
        <div className="min-h-screen flex justify-center items-start">
            <div className="container mx-auto px-4 sm:px-6 py-3 translate-z-0 overscroll-x-contain">
              <MksHeaderContent />
              <SearchBar />
              {mediaSectionData.map((section, index) => {
                const media = section.media;
                return (
                  <section
                    key={`${section.type}-${index}`}
                    className="mt-10 sm:mt-14"
                    role="region"
                    lang="es">
                    <div className="relative isolate overflow-hidden rounded-[1.25rem] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_32px_-20px_rgba(0,0,0,0.35)] bg-surface-1 dark:bg-dark-surface-1 p-4 sm:p-5 md:p-6">
                      {media && media.length > 0 ? (
                        <>
                          <img
                            className="absolute -inset-[15%] w-[130%] h-[130%] -z-[2] object-cover blur-[48px] saturate-110 opacity-28 pointer-events-none"
                            src={mediaImageSrc(
                              media[0].backdrop_path ?? media[0].poster_path,
                              "w300"
                            )}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 -z-[1] pointer-events-none bg-gradient-to-b from-surface-1/55 via-surface-1/85 to-surface-1/95 dark:from-dark-surface-1/55 dark:via-dark-surface-1/85 dark:to-dark-surface-1/95" aria-hidden="true" />
                        </>
                      ) : null}
                      <div className="mb-4 sm:mb-5 flex items-end justify-between gap-2 sm:gap-4">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-text-high dark:text-dark-text-high">
                          {section.title}
                        </h2>
                        <Link
                          to={`/${section.type}/all`}
                          className="group inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-text-low dark:text-dark-text-low hover:text-accent dark:hover:text-dark-accent hover:bg-surface-3 dark:hover:bg-dark-surface-2 transition-colors">
                          {isEs ? "Ver todo" : "See all"}
                          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                      <WithSkeleton loading={isLoadingMedia}>
                        {isErrorCatched && !isLoadingMedia ? (
                          <div
                            role="alert"
                            className="flex items-start gap-3 rounded-xl bg-surface-2 dark:bg-dark-surface-2 px-4 py-3 text-sm text-text-low dark:text-dark-text-low">
                            <TriangleAlert
                              className="w-5 h-5 shrink-0 text-accent dark:text-dark-accent"
                              aria-hidden="true"
                            />
                            <p>
                              {isEs
                                ? "No se pudieron cargar los títulos. Revisa tu conexión e inténtalo de nuevo."
                                : "Couldn't load the titles. Check your connection and try again."}
                            </p>
                          </div>
                        ) : media && media.length > 0 ? (
                          <>
                            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:items-stretch lg:gap-6">
                              <Link
                                to={`/${section.type}/detail/${media[0].id}`}
                                className="group relative block overflow-hidden rounded-2xl bg-dark-surface-2 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <img
                                  className="w-full aspect-[16/10] sm:aspect-video object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                  src={mediaImageSrc(
                                    media[0].backdrop_path ??
                                      media[0].poster_path,
                                    "w1280"
                                  )}
                                  alt=""
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-7">
                                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-tight text-balance">
                                    {"title" in media[0] ? media[0].title : media[0].name}
                                  </h3>
                                  <div className="mt-2 flex items-center gap-3 text-sm text-[#e8cdb0]">
                                    <span className="inline-flex items-center gap-1 font-semibold tabular-nums text-dark-accent">
                                      <Star className="w-4 h-4 fill-current" />
                                      {media[0].vote_average?.toFixed(1)}
                                    </span>
                                    <span aria-hidden="true">·</span>
                                    <span className="tabular-nums">
                                      {String(("release_date" in media[0] ? media[0].release_date : media[0].first_air_date) ?? "").slice(0, 4)}
                                    </span>
                                  </div>
                                  <p className="mt-2 sm:mt-3 max-w-prose text-sm md:text-[15px] leading-relaxed text-white/85 line-clamp-2">
                                    {media[0].overview}
                                  </p>
                                </div>
                              </Link>
                              <ol className="min-w-0 flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-3 lg:flex lg:flex-col lg:gap-2">
                                {media.slice(1, 5).map((item, i) => (
                                  <li key={`${item.id}-${i}`} className="min-w-0 sm:w-auto lg:flex lg:flex-1 lg:min-h-0">
                                    <Link
                                      to={`/${section.type}/detail/${item.id}`}
                                      className="group min-w-0 flex items-center gap-3 rounded-xl p-2 pr-3 bg-surface-3 dark:bg-dark-surface-2 shadow-sm transition-all duration-200 hover:bg-surface-2 dark:hover:bg-dark-surface-3 hover:shadow-md lg:flex-1">
                                      <img
                                        className="w-14 aspect-[2/3] rounded-md object-cover bg-dark-surface-3 sm:w-11 sm:h-16 sm:aspect-auto"
                                        src={mediaImageSrc(item.poster_path, "w185")}
                                        alt=""
                                        loading="lazy"
                                      />
                                      <div className="min-w-0 flex-1">
                                        <p className="truncate font-semibold text-text-high dark:text-dark-text-high">
                                          {"title" in item ? item.title : item.name}
                                        </p>
                                        <p className="text-xs tabular-nums text-text-low dark:text-dark-text-low">
                                          {String(("release_date" in item ? item.release_date : item.first_air_date) ?? "").slice(0, 4)}
                                        </p>
                                      </div>
                                      <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold tabular-nums text-accent dark:text-dark-accent">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        {item.vote_average?.toFixed(1)}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div className="relative mt-3">
                              <button
                                type="button"
                                className="absolute top-1/2 z-5 hidden w-10 h-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text-high shadow-[0_6px_18px_-6px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.06)] cursor-pointer transition-[transform,background-color,color] duration-[180ms] ease-out hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 active:scale-95 dark:bg-dark-surface-3/90 dark:text-dark-text-high dark:shadow-[0_6px_18px_-6px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] dark:hover:bg-dark-accent dark:hover:text-dark-bg-main [@media(min-width:768px)_and_(hover:hover)]:flex -left-2"
                                aria-label={isEs ? "Anterior" : "Previous"}
                                onClick={(e) =>
                                  e.currentTarget.parentElement
                                    ?.querySelector<HTMLElement>("[data-rail-row]")
                                    ?.scrollBy({ left: -e.currentTarget.parentElement.clientWidth * 0.8, behavior: "smooth" })
                                }>
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <div className="flex gap-3 overflow-x-auto overflow-y-hidden py-3 snap-x snap-mandatory overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-rail-row="">
                                {media.slice(5).map((item, i) => (
                                  <div key={`${item.id}-${i}`} className="shrink-0 snap-start">
                                    <LazyMediaContainer
                                      key={item.id}
                                      media_={item}
                                      type={section.type}
                                      containerType="Minimal"
                                    />
                                  </div>
                                ))}
                              </div>
                              <button
                                type="button"
                                className="absolute top-1/2 z-5 hidden w-10 h-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text-high shadow-[0_6px_18px_-6px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.06)] cursor-pointer transition-[transform,background-color,color] duration-[180ms] ease-out hover:bg-accent hover:text-white focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 active:scale-95 dark:bg-dark-surface-3/90 dark:text-dark-text-high dark:shadow-[0_6px_18px_-6px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)] dark:hover:bg-dark-accent dark:hover:text-dark-bg-main [@media(min-width:768px)_and_(hover:hover)]:flex -right-2"
                                aria-label={isEs ? "Siguiente" : "Next"}
                                onClick={(e) =>
                                  e.currentTarget.parentElement
                                    ?.querySelector<HTMLElement>("[data-rail-row]")
                                    ?.scrollBy({ left: e.currentTarget.parentElement.clientWidth * 0.8, behavior: "smooth" })
                                }>
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </div>
                          </>
                        ) : null}
                      </WithSkeleton>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
      </>
    );
  }
);

export { HomeViewContent };