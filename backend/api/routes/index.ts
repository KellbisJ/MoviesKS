import { Router } from 'express';
import previewMedia from './preview-media';
import previewCategoriesMedia from './preview-categories-media';
import categoryMediaPreviewDiscover from './category-media-preview-discover';
import detailMedia from './detail-media';
import detailMediaSimilar from './detail-media-similar';
import videosMedia from './videos-media';
import searchMedia from './search-media';
import mediaImages from './media-images';
import mediaPopularLists from './media-lists';

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
		PopularMoviesList: 'http://localhost:8000/api/movie/popular',
		PopularTvList: 'http://localhost:8000/api/tv/popular',
	}); // Spaghetti
});

router.use(previewMedia);
router.use(previewCategoriesMedia);
router.use(categoryMediaPreviewDiscover);
router.use(detailMedia);
router.use(detailMediaSimilar);
router.use(videosMedia);
router.use(searchMedia);
router.use(mediaImages);
router.use(mediaPopularLists);

export default router;
