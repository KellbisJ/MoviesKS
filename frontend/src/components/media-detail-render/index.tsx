import { MediaDetailPropsInterface } from '../../types/media-detail-props-interface';
import { BigPosterPathNullSkeleton } from '../loading-skeletons';
import { SimilarGenresNullSkeleton } from '../loading-skeletons';
import { useFavoriteMedia } from '../../context/favorite-media-context';
import { CreateMediaImages } from '../create-media-images';
import { CreateSimilarGenres } from '../create-similar-genres';
import { CreateSimilarMediaDetail } from '../create-similar-media-detail';
import { TrailerMedia } from '../modals/trailer-media';
import { Star, Save, Clapperboard } from 'lucide-react';

const MediaDetailRender: React.FC<MediaDetailPropsInterface> = ({
	mediaDetail,
	mediaDetailVideos,
	mediaImages,
	similarGenres,
	similarMedia,
	isMovie,
	handleFavoriteClick,
	showTrailer,
	setShowTrailer,
	videoKey,
	mediaType,
}) => {
	const { favorites } = useFavoriteMedia();
	const favoriteMedia = [...favorites.movies, ...favorites.tv]; // Because we want to know all favorite media available
	const isFavorite = favoriteMedia.some((favMedia) => favMedia.id === mediaDetail.id); // Whether is movie or tv this will work effectively because it's comparing both cases, when is movie or tv

	return (
		<div className="text-black dark:text-gray-100">
			<div className="flex flex-wrap gap-5 mb-6 flex-col items-center md:flex-row md:items-normal">
				<div className="flex-1 w-full max-w-96 sm:max-w-96 h-[460px] p-4 rounded-lg bg-blue-100 dark:bg-[#363062] flex justify-center relative">
					{mediaDetail.poster_path === null ? (
						<BigPosterPathNullSkeleton />
					) : (
						<img
							className="w-full md:w-full max-w-full max-h-full rounded-lg cursor-pointer"
							src={`https://image.tmdb.org/t/p/w500/${mediaDetail.poster_path}`}
							alt="Media Poster"
						/>
					)}
					<div className="absolute top-4 left-2 right-0 flex justify-between p-2 pl-3 text-2xl z-10">
						<span
							className={`absolute cursor-pointer z-20 transition-colors duration-300 ease-in-out ${
								isFavorite ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'
							}`}
							onClick={handleFavoriteClick}>
							<Save />
						</span>
					</div>
				</div>
				<div className="flex-[2] flex flex-col md:flex-row gap-4 bg-blue-100 dark:bg-[#363062] p-4 rounded-lg w-full max-w-96 sm:h-[460px] md:max-w-full ">
					<div className="flex flex-col gap-4 w-full md:w-2/4">
						<div>
							<h2 className="text-xl">
								{isMovie(mediaDetail) ? mediaDetail.title || mediaDetail.original_title : mediaDetail.name || mediaDetail.original_name}
							</h2>
							<div className="flex items-center">
								{mediaDetail.vote_average} <Star size={16} className="ml-1 text-yellow-400" />
							</div>
						</div>

						<h3 className="text-lg">{mediaDetail?.tagline}</h3>
						<div className="flex flex-wrap flex-col gap-2.5">
							<p>{`Conteo de votos: ${mediaDetail?.vote_count}.`}</p>
							<p>{`Fecha de lanzamiento: ${isMovie(mediaDetail) ? mediaDetail.release_date : mediaDetail.first_air_date}.`}</p>
							<p>
								{isMovie(mediaDetail)
									? `Duración: ${mediaDetail?.runtime !== undefined ? `${mediaDetail?.runtime} minutos.` : 'minutos'}`
									: `Duración de episodio aproximadamente: ${
											mediaDetail?.episode_run_time[0] !== undefined ? `${mediaDetail?.episode_run_time[0]} minutos` : 'minutos'
									  }.`}
							</p>

							<p>{`Estado: ${mediaDetail?.status}.`} </p>
						</div>
						{mediaDetailVideos?.length === 0 ? (
							<h3>No trailer or teaser available</h3>
						) : (
							<button
								className="w-full lg:w-60 lg:max-w-60 bg-gray-600 hover:bg-cyan-500 dark:hover:bg-cyan-500  border-none p-2.5 px-5 text-base cursor-pointer rounded-md transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 flex items-center justify-center text-white dark:text-gray-100"
								onClick={() => setShowTrailer(true)}>
								<Clapperboard className="mr-2" />
								Ver Trailer
							</button>
						)}
					</div>

					<div className="flex w-full md:w-2/4 h-80 lg:h-full rounded-lg justify-center items-center mx-auto">
						<CreateMediaImages media={mediaImages} type={mediaType} />
					</div>
				</div>
			</div>

			<div className={'flex gap-6 mb-6 flex-col w-full max-w-96 md:max-w-full md:flex-row mx-auto'}>
				<div className={'flex-grow bg-blue-100 dark:bg-[#363062] p-4 rounded-lg w-full md:w-[80%]'}>
					<h3>Sinopsis</h3>
					<p>{mediaDetail?.overview === '' ? 'No description available' : mediaDetail?.overview}</p>
				</div>

				<div className={'flex-grow bg-blue-100 dark:bg-[#363062] p-4 rounded-lg flex gap-2.5 md:w-[20%] flex-wrap justify-center'}>
					{/* <h3>Similar Genres:</h3> */}
					<h3>Géneros similares:</h3>
					{similarGenres.length === 0 ? <SimilarGenresNullSkeleton /> : <CreateSimilarGenres genres={similarGenres} type={mediaType} />}
				</div>
			</div>

			<h3 className="mb-8">Similar to watch about {mediaType}</h3>
			{<CreateSimilarMediaDetail media={similarMedia} type={mediaType} />}

			<TrailerMedia isOpen={showTrailer} onClose={() => setShowTrailer(false)} videoKey={videoKey as string} />
		</div>
	);
};

export { MediaDetailRender };
