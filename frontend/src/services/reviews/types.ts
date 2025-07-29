interface MediaReviewInterface {
	id: number;
	page: number;
	results: AuthorReview[];
	total_pages: number;
	total_results: number;
}

interface AuthorReview {
	author: string;
	author_details: AuthorDetailsInterface;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}
interface AuthorDetailsInterface {
	name: string;
	username: string;
	avatar_path?: string;
	rating?: number;
}

export { MediaReviewInterface };
