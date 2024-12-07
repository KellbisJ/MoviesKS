import React from 'react';
import { CreateMedia } from '../CreateMedia';
import './CreateSimilarMediaDetail.css';

function CreateSimilarMediaDetail({ media, type }) {
	if (!media.results || media.results.length === 0) {
		return <div>No similar {type} found.</div>;
	} else {
		return (
			<div className="gridMediaContainer gridMediaContainerSimilar">
				<CreateMedia media={media.results} type={type} />
			</div>
		);
	}
}

export { CreateSimilarMediaDetail };
