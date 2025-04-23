import React, { useEffect, useState } from 'react';
import { CreateMedia } from '../../components/specific/create-media';
import { useSavedMedia } from '../../context/favorite-media-context';
import { MediaSavedVoid } from '../../components/utilities/loading-skeletons';
import { PopcornParticlesLoader } from '../../components/utilities/loaders-animation';
import { MediaTypeT } from '@/types/media-type';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { useLanguages } from '@/context/lang';

const SavedMedia = (): React.JSX.Element => {
	const { language } = useLanguages();
	const [loadingComponents, setLoadingComponents] = useState<boolean>(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		const timeoutId = setTimeout(() => {
			setLoadingComponents(false);
		}, 300);
		return () => clearTimeout(timeoutId);
	}, []);

	const { savedMedia } = useSavedMedia();

	const hasMovies = savedMedia.movies.length > 0;
	const hasShows = savedMedia.tv.length > 0;

	return (
		<>
			{loadingComponents ? (
				<PopcornParticlesLoader />
			) : (
				<>
					<div className="max-w-[1536px] mx-auto">
						<div className="mb-12 flex flex-col gap-2">
							<h1 className="text-2xl sm:text-3xl font-bold dark:text-gray-100">
								{isSpanishLang(language) ? 'Mis medios guardados' : 'My Saved Media'}
							</h1>
							<p className="dark:text-gray-100">
								{isSpanishLang(language)
									? 'Temporal, según el dispositivo digital. Este contenido multimedia se almacena en caché y solo en el navegador de ese dispositivo.'
									: "Temporary, depending on the digital device. This media is cached and stored only on that device's browser."}
							</p>
						</div>

						<section aria-labelledby="movies-section" className="mb-12">
							<h2 id="movies-section" className="text-2xl font-semibold dark:text-gray-100 mb-8">
								{isSpanishLang(language) ? 'Películas' : 'Movies'}
							</h2>
							{hasMovies ? (
								<CreateMedia media={savedMedia.movies} type={MediaTypeT.movie} />
							) : (
								<MediaSavedVoid />
							)}
						</section>

						<section aria-labelledby="tv-section">
							<h2 id="tv-section" className="text-2xl font-semibold dark:text-gray-100 mb-8">
								{isSpanishLang(language) ? 'Series de TV' : 'TV series'}
							</h2>
							{hasShows ? (
								<CreateMedia media={savedMedia.tv} type={MediaTypeT.tv} />
							) : (
								<MediaSavedVoid />
							)}
						</section>
					</div>
				</>
			)}
		</>
	);
};

export { SavedMedia };
