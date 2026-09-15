import { useMemo, useState } from 'react';
import { Play, VideoOff } from 'lucide-react';
import { MediaVideosResultInterface } from '@/services/media-videos/types';
import { TrailerMedia } from '@/components/modals/trailer-media';

const TYPE_ORDER = ['Trailer', 'Teaser', 'Clip', 'Featurette', 'Behind the Scenes'];

const typeLabel = (type: string, isEs: boolean) => {
	if (!isEs) return type;
	switch (type) {
		case 'Trailer':
			return 'Tráiler';
		case 'Teaser':
			return 'Avance';
		case 'Clip':
			return 'Clip';
		case 'Featurette':
			return 'Especial';
		case 'Behind the Scenes':
			return 'Detrás de cámaras';
		case 'Bloopers':
			return 'Tomas falsas';
		default:
			return type;
	}
};

/**
 * Video thumbnails that open the player on demand. Embedding every YouTube
 * iframe up front loaded megabytes of player script per video on phones.
 */
const CreateMediaVideos = ({
	mediaVideos,
	isEs,
}: {
	mediaVideos: MediaVideosResultInterface[];
	isEs: boolean;
}): React.JSX.Element => {
	const [playing, setPlaying] = useState<MediaVideosResultInterface | null>(null);

	const videos = useMemo(() => {
		const rank = (type: string) => {
			const index = TYPE_ORDER.indexOf(type);
			return index === -1 ? TYPE_ORDER.length : index;
		};
		return mediaVideos
			.filter((video) => video.site === 'YouTube' && video.key)
			.sort((a, b) => rank(a.type) - rank(b.type) || Number(b.official) - Number(a.official));
	}, [mediaVideos]);

	if (videos.length === 0) {
		return (
			<div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-xl bg-surface-2 px-5 py-10 text-center text-text-low dark:bg-dark-surface-2 dark:text-dark-text-low">
				<VideoOff className="h-8 w-8 text-secondary dark:text-dark-secondary" aria-hidden="true" />
				{isEs ? 'Este título no tiene videos.' : 'This title has no videos.'}
			</div>
		);
	}

	return (
		<>
			<ul className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
				{videos.map((video) => (
					<li key={video.key}>
						<button
							type="button"
							onClick={() => setPlaying(video)}
							aria-haspopup="dialog"
							className="group block w-full rounded-lg text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent dark:focus-visible:outline-dark-accent">
							<span className="relative block aspect-video overflow-hidden rounded-lg bg-surface-2 shadow-lg dark:bg-dark-surface-2">
								<img
									src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
									alt=""
									loading="lazy"
									className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
								/>
								<span
									aria-hidden="true"
									className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-200 group-hover:bg-black/35">
									<span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
										<Play className="ml-0.5 h-5 w-5 fill-current" />
									</span>
								</span>
							</span>
							<span className="mt-2 block text-xs font-medium text-text-low dark:text-dark-text-low">
								{typeLabel(video.type, isEs)}
							</span>
							<span className="mt-0.5 line-clamp-2 block font-semibold text-text-high dark:text-dark-text-high">
								{video.name}
							</span>
						</button>
					</li>
				))}
			</ul>

			<TrailerMedia
				isOpen={playing !== null}
				onClose={() => setPlaying(null)}
				videoKey={playing?.key}
				title={playing?.name ?? ''}
				isEs={isEs}
			/>
		</>
	);
};

export { CreateMediaVideos };
