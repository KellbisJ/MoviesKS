// media-detail-render.tsx
import { MediaDetailPropsInterface } from './types';
import { BigPosterPathNullSkeleton } from '../loading-skeletons';
import { useSavedMedia } from '../../context/favorite-media-context';
import { CreateMediaImages } from '../create-media-images';
import { CreateSimilarGenres } from '../create-similar-genres';
import { CreateSimilarMediaDetail } from '../create-media';
import { TrailerMedia } from '../modals/trailer-media';
import { Star, Save, Clapperboard, Globe, Film, Clock, Ticket, Calendar, Languages } from 'lucide-react';
import { memo } from 'react';
import { Backdrop } from '@/services/media-images/types';

const MediaDetailRender: React.FC<MediaDetailPropsInterface> = memo(
	({
		mediaDetail,
		mediaDetailVideos,
		mediaImages,
		similarGenres,
		similarMedia,
		isMovie,
		handleSaveMedia,
		showTrailer,
		setShowTrailer,
		videoKey,
		mediaType,
	}) => {
		const { savedMedia } = useSavedMedia();
		const favoriteMedia = [...savedMedia.tv];
		const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === mediaDetail.id);

		// New data points
		const productionCompanies = mediaDetail.production_companies || [];
		const spokenLanguages = mediaDetail.spoken_languages || [];
		const releaseDate = isMovie(mediaDetail) ? mediaDetail.release_date : mediaDetail.first_air_date;
		const runtime = isMovie(mediaDetail)
			? `${mediaDetail.runtime} min`
			: mediaDetail.episode_run_time?.[0]
			? `${mediaDetail.episode_run_time[0]} min/episode`
			: 'N/A';

		const images: Backdrop[] = [...mediaImages.backdrops, ...mediaImages.posters];

		return (
			<div className="text-black dark:text-gray-100 max-w-[1600px] mx-auto">
				{/* Images exihibition section */}
				<div className="relative h-96 w-full mb-8 rounded-2xl overflow-hidden shadow-xl">
					{images.length > 0 ? (
						<CreateMediaImages media={mediaImages} type={mediaType} />
					) : (
						<>
							<img
								className="w-full h-full object-cover absolute inset-0"
								src={`https://image.tmdb.org/t/p/w1280/${mediaDetail.backdrop_path}`}
								alt="Backdrop"
								loading="lazy"
							/>
						</>
					)}

					<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
				</div>

				{/* Main Content */}
				<div className="flex flex-col lg:flex-row gap-8 mb-8">
					{/* Poster Column */}
					<div className="w-full lg:w-1/3 xl:w-1/4 relative group">
						<div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
							{mediaDetail.poster_path ? (
								<img
									className="w-full h-auto aspect-[2/3] object-cover"
									src={`https://image.tmdb.org/t/p/w780/${mediaDetail.poster_path}`}
									alt="Poster"
									loading="eager"
								/>
							) : (
								<BigPosterPathNullSkeleton />
							)}
							<button
								onClick={handleSaveMedia(mediaType, mediaDetail)}
								className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
									isFavorite ? 'text-cyan-400 bg-cyan-400/20' : 'text-gray-200 hover:text-cyan-400 bg-gray-800/30 hover:bg-cyan-400/20'
								}`}>
								<Save className="w-6 h-6" />
							</button>
						</div>
					</div>

					{/* Details Column */}
					<div className="flex-1 space-y-6">
						<div className="space-y-4">
							<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
								{isMovie(mediaDetail) ? mediaDetail.title : mediaDetail.name}
								<span className="ml-4 text-2xl font-normal text-gray-400 dark:text-gray-500">({new Date(releaseDate).getFullYear()})</span>
							</h1>

							<div className="flex items-center space-x-4">
								<div className="flex items-center bg-gray-800 text-yellow-400 px-3 py-1 rounded-full">
									<Star className="w-5 h-5 mr-1" />
									<span className="font-medium">{mediaDetail.vote_average.toFixed(1)}</span>
									<span className="ml-2 text-gray-400">({mediaDetail.vote_count.toLocaleString()})</span>
								</div>

								{mediaDetailVideos?.length > 0 && (
									<button
										onClick={() => setShowTrailer(true)}
										className="flex items-center bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full transition-all">
										<Clapperboard className="w-5 h-5 mr-2" />
										Play Trailer
									</button>
								)}
							</div>

							{mediaDetail.tagline && <p className="text-xl italic text-gray-600 dark:text-gray-400">"{mediaDetail.tagline}"</p>}
						</div>

						{/* Metadata Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="flex items-center space-x-2">
								<Film className="w-5 h-5 text-cyan-500" />
								<span>{mediaType === 'movie' ? 'Movie' : 'TV Series'}</span>
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
									<span className="font-medium">Budget:</span>
									<span>${mediaDetail.budget.toLocaleString()}</span>
								</div>
							)}

							{isMovie(mediaDetail) && mediaDetail.revenue > 0 && (
								<div className="flex items-center space-x-2">
									<span className="font-medium">Revenue:</span>
									<span>${mediaDetail.revenue.toLocaleString()}</span>
								</div>
							)}
						</div>

						{/* Production Companies */}
						{productionCompanies.length > 0 && (
							<div className="space-y-2">
								<h3 className="text-lg font-semibold">Production Companies</h3>
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
											<span key={company.id} className="text-sm text-gray-500">
												{company.name}
											</span>
										)
									)}
								</div>
							</div>
						)}

						{/* Overview */}
						<div className="space-y-2">
							<h3 className="text-lg font-semibold">Overview</h3>
							<p className="text-gray-600 dark:text-gray-400 leading-relaxed">{mediaDetail.overview || 'No overview available.'}</p>
						</div>
					</div>
				</div>

				{/* Additional Sections */}
				<div className="space-y-12">
					{/* Genres */}
					{similarGenres.length > 0 && (
						<section className="space-y-4">
							<h2 className="text-2xl font-bold">Genres</h2>
							<CreateSimilarGenres genres={similarGenres} type={mediaType} />
						</section>
					)}

					{/* Similar Media */}
					{similarMedia.length > 0 && (
						<section className="space-y-4">
							<h2 className="text-2xl font-bold">More Like This</h2>
							<CreateSimilarMediaDetail media={similarMedia} type={mediaType} />
						</section>
					)}
				</div>

				<TrailerMedia isOpen={showTrailer} onClose={() => setShowTrailer(false)} videoKey={videoKey as string} />
			</div>
		);
	}
);

export { MediaDetailRender };
