import { CreateMedia } from '../create-media';
import { CreateMediaPropsInterface } from '../create-media/types';

const CreateSimilarMediaDetail: React.FC<CreateMediaPropsInterface> = ({ media, type }) => {
	if (!media || media.length === 0) {
		return <div>No similar {type} found.</div>;
	} else {
		return <CreateMedia media={media} type={type} />;
	}
};

export { CreateSimilarMediaDetail };
