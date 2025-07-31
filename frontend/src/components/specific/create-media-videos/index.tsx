import { useValidMediaType } from '@/hooks/use-valid-media-type';
import { getMediaVideos } from '@/services/media-videos';
import { MediaVideosResultInterface } from '@/services/media-videos/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateMediaVideos = (): React.JSX.Element => {
	const { id } = useParams();

	const mediaType = useValidMediaType();
	const mediaId = id || '';

	const [mediaVideos, setMediaVideos] = useState<MediaVideosResultInterface[]>([]);

	useEffect(() => {
		const fetchMediaVideos = async () => {
			const req = await getMediaVideos(mediaType, mediaId);
			const mediaVideosData = req.results;
			setMediaVideos(mediaVideosData);
		};
		fetchMediaVideos();
	}, []);

	console.log(mediaVideos);
	return (
		<section className="px-4 py-8">
			{mediaVideos.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{mediaVideos.map((video) => (
						<div key={video.key} className="w-full max-w-[560px] mx-auto">
							<div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
								<iframe
									src={`https://www.youtube.com/embed/${video.key}`}
									title={video.name || 'Media Trailer'}
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									loading="lazy"
									className="w-full h-full border-0"
								/>
							</div>
							{video.name && <p className="mt-2 font-medium text-center">{video.name}</p>}
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-12 bg-gray-50 rounded-lg">
					<p className="text-gray-500">No videos available</p>
				</div>
			)}
		</section>
	);
};

export { CreateMediaVideos };
