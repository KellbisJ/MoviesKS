import React from 'react';
import { CreateMedia } from '../create-media';

function CreateSimilarMediaDetail({ media, type }) {
	if (!media.results || media.results.length === 0) {
		return <div>No similar {type} found.</div>;
	} else {
		return <CreateMedia media={media.results} type={type} />;
	}
} // Something pending

export { CreateSimilarMediaDetail };
