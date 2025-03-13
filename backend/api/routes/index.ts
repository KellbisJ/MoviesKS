import { Router } from 'express';
import { previewMediaRouter } from './preview-media';
import { previewCategoriesMediaRouter } from './preview-categories-media';
import { categoryMediaPreviewDiscoverRouter } from './category-media-preview-discover';
import { detailMediaRouter } from './detail-media';
import { detailMediaSimilarRouter } from './detail-media-similar';
import { videosMediaRouter } from './videos-media';
import { searchMediaRouter } from './search-media';
import { mediaImagesRouter } from './media-images';
import { mediaListRouter } from './media-lists';

const router = Router();

router.get('/', (req, res) => {
	res.json({
		TrendingPreviewMovies: 'http://localhost:8000/api/trending/movie/day',
		TrendingPreviewTv: 'http://localhost:8000/api/trending/tv/day',
		PreviewMovieCategories: 'http://localhost:8000/api/genre/movie/list',
		PreviewTvCategories: 'http://localhost:8000/api/genre/tv/list',
		CategoryMoviePreview: 'http://localhost:8000/api/discover/movie?with_genres=28&page=1',
		CategoryTvPreview: 'http://localhost:8000/api/discover/tv?with_genres=10759&page=1',
		DetailMovie: 'http://localhost:8000/api/movie/550?language=en-US',
		DetailTv: 'http://localhost:8000/api/tv/1399?language=en-US',
		DetailMovieSimilar: 'http://localhost:8000/api/movie/550/similar?language=en-US&page=1',
		DetailTvSimilar: 'http://localhost:8000/api/tv/1399/similar?language=en-US&page=1',
		VideosMovies: 'http://localhost:8000/api/movie/550/videos?language=en-US',
		VideosTv: 'http://localhost:8000/api/tv/1399/videos?language=en-US',
		SearchMovies: 'http://localhost:8000/api/search/movie/hola',
		SearchTvSeries: 'http://localhost:8000/api/search/tv/game',
		MovieImages: 'http://localhost:8000/api/movie/550/images',
		TVImages: 'http://localhost:8000/api/tv/1399/images',
		PopularTvList: 'http://localhost:8000/api/tv/popular',
		NowPlayingMoviesList: 'http://localhost:8000/api/movie/now_playing',
		PopularMoviesList: 'http://localhost:8000/api/movie/popular',
		TopRatedMoviesList: 'http://localhost:8000/api/movie/top_rated',
		UpcomingMoviesList: 'http://localhost:8000/api/movie/upcoming',
	}); // Spaghetti
});

router.use(previewMediaRouter);
router.use(previewCategoriesMediaRouter);
router.use(categoryMediaPreviewDiscoverRouter);
router.use(detailMediaRouter);
router.use(detailMediaSimilarRouter);
router.use(videosMediaRouter);
router.use(searchMediaRouter);
router.use(mediaImagesRouter);
router.use(mediaListRouter);

export default router;
