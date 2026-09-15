import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RotateCw, SearchX, TriangleAlert } from 'lucide-react';
import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { getMediaDetail } from '../../services/media-detail';
import { MovieDetailInterface, TVDetailInterface } from '@/services/media-detail/types';
import { MediaDetailRender } from '../../components/specific/media-detail-render';
import { WithSkeleton } from '@/components/utilities/loading-skeletons/WithSkeleton';
import { useLanguages } from '@/context/lang';
import { isSpanishLang } from '@/utils/is-spanish-lang';
import { mediaTitle } from '@/components/specific/media-detail-render/detail-copy';
import { MediaTypeT } from '@/types/media-type';

type DetailState =
	| { status: 'loading' }
	| { status: 'ready'; media: MovieDetailInterface | TVDetailInterface }
	| { status: 'not-found' }
	| { status: 'error' };

const primaryButton =
	'inline-flex items-center justify-center gap-2 rounded-full bg-accent-ink px-5 py-2.5 text-sm font-semibold text-white cursor-pointer transition-colors duration-200 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-dark-accent dark:text-dark-bg-main dark:hover:bg-dark-primary dark:focus-visible:outline-dark-accent';
const secondaryButton =
	'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-accent-ink transition-colors duration-200 hover:bg-surface-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-dark-accent dark:hover:bg-dark-surface-1 dark:focus-visible:outline-dark-accent';

const MediaDetail = (): React.JSX.Element => {
	const { id } = useParams();
	const mediaType = useValidMediaType();
	const mediaId = id || '';
	const { language } = useLanguages();
	const isEs = isSpanishLang(language);

	const [state, setState] = useState<DetailState>({ status: 'loading' });
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		let cancelled = false;
		setState({ status: 'loading' });
		window.scrollTo(0, 0);

		// TMDB ids are numeric; anything else can't exist.
		if (!/^\d+$/.test(mediaId)) {
			setState({ status: 'not-found' });
			return;
		}

		getMediaDetail(mediaType, mediaId)
			.then((media) => {
				if (cancelled) return;
				// The proxy can answer 200 with an empty body for unknown ids.
				setState(media && media.id ? { status: 'ready', media } : { status: 'not-found' });
			})
			.catch((error: unknown) => {
				if (cancelled) return;
				const notFound = error instanceof Error && /status: 404/.test(error.message);
				setState({ status: notFound ? 'not-found' : 'error' });
			});

		return () => {
			cancelled = true;
		};
		// language: the detail text (title, synopsis, genres) comes back translated.
	}, [mediaType, mediaId, language, attempt]);

	const title = state.status === 'ready' ? mediaTitle(state.media) : '';

	useEffect(() => {
		if (!title) return;
		const previous = document.title;
		document.title = `${title} · MoviesKS`;
		return () => {
			document.title = previous;
		};
	}, [title]);

	if (state.status === 'not-found' || state.status === 'error') {
		const notFound = state.status === 'not-found';
		const Icon = notFound ? SearchX : TriangleAlert;
		return (
			<div
				role="alert"
				className="container mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-3 px-4 py-16 text-center">
				<Icon className="h-10 w-10 text-secondary dark:text-dark-secondary" aria-hidden="true" />
				<h1 className="text-2xl font-bold text-text-high dark:text-dark-text-high">
					{notFound
						? isEs
							? 'No encontramos este título'
							: "We couldn't find this title"
						: isEs
							? 'No pudimos cargar este título'
							: "We couldn't load this title"}
				</h1>
				<p className="text-text-low dark:text-dark-text-low">
					{notFound
						? isEs
							? 'Puede que el enlace esté mal escrito o que el título ya no exista.'
							: 'The link may be mistyped, or the title no longer exists.'
						: isEs
							? 'El servidor no respondió. Revisa tu conexión e inténtalo de nuevo.'
							: "The server didn't respond. Check your connection and try again."}
				</p>
				<div className="mt-3 flex flex-wrap items-center justify-center gap-2">
					{notFound ? null : (
						<button type="button" onClick={() => setAttempt((n) => n + 1)} className={primaryButton}>
							<RotateCw className="h-4 w-4" aria-hidden="true" />
							{isEs ? 'Reintentar' : 'Try again'}
						</button>
					)}
					<Link to={`/${mediaType}`} className={notFound ? primaryButton : secondaryButton}>
						{mediaType === MediaTypeT.movie
							? isEs
								? 'Explorar películas'
								: 'Browse movies'
							: isEs
								? 'Explorar series'
								: 'Browse TV series'}
					</Link>
				</div>
			</div>
		);
	}

	return (
		<WithSkeleton loading={state.status === 'loading'}>
			{state.status === 'ready' ? (
				<MediaDetailRender media={state.media} mediaId={mediaId} mediaType={mediaType} isEs={isEs} />
			) : null}
		</WithSkeleton>
	);
};

export { MediaDetail };
