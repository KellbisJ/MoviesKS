import { MediaVideosResultInterface } from '@/services/media-videos/types';

const CreateMediaVideos = ({
	mediaVideos,
}: {
	mediaVideos: MediaVideosResultInterface[];
}): React.JSX.Element => {
	console.log(mediaVideos);
	return (
		<section className="px-4 py-8">
			{mediaVideos.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-14">
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
