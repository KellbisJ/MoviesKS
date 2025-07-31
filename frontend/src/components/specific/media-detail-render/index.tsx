import React, { useEffect, useState } from 'react';
import { MediaDetailPropsInterface } from './types';
import { BigPosterPathNullSkeleton } from '@/components/utilities/loading-skeletons';
import { useSavedMedia } from '../../../context/favorite-media-context';
import { CreateSimilarGenres } from '../create-similar-genres';
import { CreateMedia } from '../create-media';
import { CreateMediaImages } from '../create-media-images';
import { TrailerMedia } from '../../modals/trailer-media';
import { Star, Save, Clapperboard, Globe, Film, Clock, Ticket } from 'lucide-react';
import { memo } from 'react';
import { MediaTypeT } from '@/types/media-type';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { useLanguages } from '@/context/lang';
import { CreateMediaVideos } from '../create-media-videos';

const MediaDetailRender: React.FC<MediaDetailPropsInterface> = memo(
	({
		mediaDetail,
		mediaDetailVideos,
		mediaImages,
		similarGenres,
		similarMedia,
		mediaReviews,
		isMovie,
		handleSaveMedia,
		showTrailer,
		setShowTrailer,
		videoKey,
		mediaType,
	}) => {
		const { language } = useLanguages();
		const { savedMedia } = useSavedMedia();
		const allSavedMedia = [...savedMedia.movies, ...savedMedia.tv]; // This is to check is the media is saved whether is movie or tv
		const isSavedMedia = allSavedMedia.some((favMedia) => favMedia.id === mediaDetail.id);

		const MEDIA_TABS = [
			{ id: 'Similar', label: 'Similar Content' },
			{ id: 'Images', label: 'Images' },
			{ id: 'Videos', label: 'Videos' },
			{ id: 'Reviews', label: 'Reviews' },
		] as const;

		type TabID = (typeof MEDIA_TABS)[number]['id'];

		const [activeTab, setActiveTab] = useState<TabID>('Similar');

		// New data points
		const productionCompanies = mediaDetail.production_companies || [];
		const spokenLanguages = mediaDetail.spoken_languages || [];
		const releaseDate = isMovie(mediaDetail)
			? mediaDetail.release_date
			: mediaDetail.first_air_date;
		const runtime = isMovie(mediaDetail)
			? `${mediaDetail.runtime} min`
			: mediaDetail.episode_run_time?.[0]
			? `${mediaDetail.episode_run_time[0]} min/episode`
			: 'N/A';

		const bigPoster = mediaDetail.backdrop_path || mediaDetail.poster_path;

		// console.log(spokenLanguages);

		return (
			<section className="text-black dark:text-gray-100 mx-auto px-6 lg:px-0 lg:-mt-8">
				<div className="relative mb-12 h-[90vh] lg:min-h-screen lg:h-auto">
					<picture className="absolute inset-0 -mx-6 lg:-mx-8 overflow-hidden">
						{bigPoster && (
							<img
								className="w-full h-full object-cover object-center shadow-2xl opacity-0 transition-opacity duration-500"
								src={`https://image.tmdb.org/t/p/w1280/${bigPoster}`}
								alt="Backdrop"
								loading="eager"
								onLoad={(e) => (e.currentTarget.style.opacity = '1')} // nice
							/>
						)}
						<div className="absolute inset-0 bg-gray-900/80" />
						<div className="absolute bottom-0 w-full h-14 bg-gradient-to-t from-gray-800 via-gray-800/20 dark:from-gray-900 dark:via-gray-[#1E1A2F]/20" />
					</picture>

					<article className="relative z-10 container mx-auto px-4 pb-4 lg:px-6 lg:pb-20 pt-12 sm:pt-20 opacity-100 h-full overflow-y-auto lg:overflow-visible">
						<div className="flex flex-col lg:flex-row gap-8 text-gray-100">
							<div className="w-full lg:w-1/3 xl:w-1/4 relative group">
								<div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
									{mediaDetail.poster_path ? (
										<img
											className="w-full h-auto aspect-[2/3] object-cover opacity-0 transition-opacity duration-500"
											src={`https://image.tmdb.org/t/p/w400/${mediaDetail.poster_path}`}
											alt="Poster"
											loading="eager"
											onLoad={(e) => (e.currentTarget.style.opacity = '1')} // nice
										/>
									) : (
										<BigPosterPathNullSkeleton />
									)}
									<button
										onClick={handleSaveMedia(mediaType, mediaDetail)}
										className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
											isSavedMedia
												? 'text-cyan-400 bg-cyan-400/20'
												: 'text-gray-200 hover:text-cyan-400 bg-gray-800/30 hover:bg-cyan-400/20'
										}`}>
										<Save className="w-6 h-6" />
									</button>
								</div>
							</div>

							<div className="flex-1 space-y-8">
								<div className="space-y-4">
									<h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
										{isMovie(mediaDetail) ? mediaDetail.title : mediaDetail.name}
										<span className="ml-4 text-2xl font-normal text-gray-300">
											({new Date(releaseDate).getFullYear()})
										</span>
									</h1>

									<div className="flex items-center flex-wrap gap-4">
										<div className="flex items-center bg-gray-800/70 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-700">
											<Star className="w-5 h-5 mr-1 text-yellow-400" />
											<span className="font-medium">{mediaDetail.vote_average.toFixed(1)}</span>
											<span className="ml-2 text-gray-300">
												({mediaDetail.vote_count.toLocaleString()})
											</span>
										</div>

										{mediaDetailVideos?.length > 0 && (
											<button
												onClick={() => setShowTrailer(true)}
												className="flex items-center bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-full transition-all">
												<Clapperboard className="w-5 h-5 mr-2" />
												{isSpanishLang(language) ? 'Ver Trailer' : 'Watch Trailer'}
											</button>
										)}
									</div>

									{mediaDetail.tagline && <p className="text-xl italic">"{mediaDetail.tagline}"</p>}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div className="flex items-center space-x-2">
										<Film className="w-5 h-5 text-cyan-500" />
										<span>
											{mediaType === MediaTypeT.movie
												? isSpanishLang(language)
													? 'Película'
													: 'Movie'
												: mediaType === MediaTypeT.tv
												? isSpanishLang(language)
													? `Serie de TV`
													: 'TV serie'
												: 'mocoverde multimedia'}
										</span>
									</div>

									<div className="flex items-center space-x-2">
										<Clock className="w-5 h-5 text-cyan-500" />
										<span>{runtime}</span>
									</div>

									<div className="flex items-center space-x-2">
										<Ticket className="w-5 h-5 text-cyan-500" />
										<span>{mediaDetail.status}</span>
									</div>

									<div className="flex items-center space-x-2">
										<Globe className="w-5 h-5 text-cyan-500" />
										<span>{mediaDetail.original_language.toUpperCase()}</span>
									</div>

									{isMovie(mediaDetail) && mediaDetail.budget > 0 && (
										<div className="flex items-center space-x-2">
											<span className="font-medium">
												{isSpanishLang(language) ? 'Presupuesto:' : 'Budget:'}
											</span>
											<span>${mediaDetail.budget.toLocaleString()}</span>
										</div>
									)}

									{isMovie(mediaDetail) && mediaDetail.revenue > 0 && (
										<div className="flex items-center space-x-2">
											<span className="font-medium">
												{isSpanishLang(language) ? 'Recaudación:' : 'Revenue:'}{' '}
											</span>
											<span>${mediaDetail.revenue.toLocaleString()}</span>
										</div>
									)}
								</div>

								{productionCompanies.length > 0 && (
									<div className="space-y-4">
										<h3 className="text-lg font-semibold">
											{isSpanishLang(language) ? 'Empresas Productoras' : 'Production Companies'}
										</h3>
										<div className="flex flex-wrap gap-4">
											{productionCompanies.map((company) =>
												company.logo_path ? (
													<img
														key={company.id}
														src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
														alt={company.name}
														className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
													/>
												) : (
													<span key={company.id} className="text-sm">
														{company.name}
													</span>
												)
											)}
										</div>
									</div>
								)}

								{spokenLanguages.length > 1 && (
									<div className="space-y-4">
										<h3 className="text-lg font-semibold ">
											{isSpanishLang(language) ? 'Lenguajes disponibles' : 'Available languages'}
										</h3>
										<div className="flex flex-wrap gap-2">
											{spokenLanguages.map((lang) =>
												lang.name ? (
													<span
														key={lang.name}
														className="p-2 min-w-20 w-20 max-w-28 text-sm text-center rounded-full bg-cyan-500">
														{lang.english_name}
													</span>
												) : (
													<span
														key={lang.name}
														className="p-2 min-w-20 w-20 max-w-28 text-sm text-center rounded-full bg-cyan-500">
														{lang.iso_639_1}
													</span>
												)
											)}
										</div>
									</div>
								)}

								{mediaDetail.overview && (
									<div className="space-y-4">
										<h3 className="text-lg font-semibold">
											{isSpanishLang(language) ? 'Sinopsis' : 'Synopsis'}
										</h3>
										<p className="leading-relaxed">{mediaDetail.overview}</p>
									</div>
								)}

								<div className="space-y-4">
									<h3 className="text-lg font-semibold">
										{isSpanishLang(language) ? 'Géneros similares' : 'Similar genres'}
									</h3>
									<div className="flex flex-wrap gap-2">
										<CreateSimilarGenres genres={similarGenres} type={mediaType} />
									</div>
								</div>
							</div>
						</div>
					</article>
				</div>

				<div className="mx-auto mt-32 relative">
					<div
						className="absolute -top-32 left-0 right-0 h-14 
             bg-gradient-to-b from-gray-800 via-gray-800/20 to-transparent
             dark:from-gray-900/90 dark:via-gray-900/20 dark:to-transparent
             pointer-events-none inset-0 -mx-6 lg:-mx-8 overflow-hidden"
					/>

					<div className="space-y-12">
						<section className="flex space-y-4 justify-center flex-col items-center">
							<div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
								{MEDIA_TABS.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={
											'px-2 py-1 rounded-md text-gray-600 dark:text-gray-300 border-cyan-500 border-r-8 border-l-8 bg-gray-200 dark:bg-gray-900 transition"'
										}>
										{tab.label}
									</button>
								))}
							</div>

							{activeTab === 'Similar' && (
								<CreateMedia media={similarMedia} type={mediaType} containerType="Similar" />
							)}
							{activeTab === 'Images' && <CreateMediaImages images={mediaImages} />}
							{activeTab === 'Videos' && <CreateMediaVideos />}
							{/* {showAdditionalInfo === 'Reviews' && (
							
							)} */}
						</section>
					</div>
				</div>

				<TrailerMedia
					isOpen={showTrailer}
					onClose={() => setShowTrailer(false)}
					videoKey={videoKey as string}
				/>
			</section>
		);
	}
);

export { MediaDetailRender };
