import { CreateMedia } from '../create-media';
import { CreateMediaPropsInterface } from '../../types/create-media-interface';

const CreateSimilarMediaDetail:React.FC<CreateMediaPropsInterface> = ({ media, type }) => {
	if (!media || media.length === 0) {
		return <div>No similar {type} found.</div>;
	} else {
		return <CreateMedia media={media} type={type} />;
	}
}

export { CreateSimilarMediaDetail };
