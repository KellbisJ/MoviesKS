import { Router } from 'express';
import { TrendingMedia } from './trending-media';
import { MediaGenresAndDiscover } from './genres-and-discover';
import { MediaData } from './movies-and-tvseries';
import { SearchMediaRouter } from './search-media';
import { MediaListRouter } from './media-lists';
import { ConfigurationsAPI } from './configurations/languages';

const apiSections = [
	'ACCOUNT',
	'AUTHENTICATION',
	'CERTIFICATIONS',
	'CHANGES',
	'COLLECTIONS',
	'COMPANIES',
	'CONFIGURATION',
	'CREDITS',
	'DISCOVER',
	'FIND',
	'GENRES',
	'GUEST SESSIONS',
	'KEYWORDS',
	'LISTS',
	'MOVIE LISTS',
	'MOVIES',
	'NETWORKS',
	'PEOPLE LISTS',
	'PEOPLE',
	'REVIEWS',
	'SEARCH',
	'TRENDING',
	'TV SERIES LISTS',
	'TV SERIES',
	'TV SEASONS',
	'TV EPISODES',
	'TV EPISODE GROUPS',
	'WATCH PROVIDERS',
] as const;

type EndpointSection = (typeof apiSections)[number];

const router = Router();

router.get('/', (req, res) => {
	res.json({
		TrendingPreviewMovies: 'http://localhost:8000/api/trending/movie/day',
		TrendingPreviewTv: 'http://localhost:8000/api/trending/tv/day',
		PreviewMovieCategories: 'http://localhost:8000/api/genre/movie/list',
		PreviewTvCategories: 'http://localhost:8000/api/genre/tv/list',
		CategoryMoviePreview: 'http://localhost:8000/api/discover/movie?with_genres=28&page=1',
		CategoryTvPreview: 'http://localhost:8000/api/discover/tv?with_genres=10759&page=1',
		DetailMovie: 'http://localhost:8000/api/movie/550?language=es',
		DetailTv: 'http://localhost:8000/api/tv/1399?language=es',
		DetailMovieSimilar: 'http://localhost:8000/api/movie/550/similar?language=es&page=1',
		DetailTvSimilar: 'http://localhost:8000/api/tv/1399/similar?language=es&page=1',
		VideosMovies: 'http://localhost:8000/api/movie/550/videos',
		VideosTv: 'http://localhost:8000/api/tv/1399/videos',
		SearchMovies: 'http://localhost:8000/api/search/movie/hola',
		SearchTvSeries: 'http://localhost:8000/api/search/tv/game',
		MovieImages: 'http://localhost:8000/api/movie/550/images',
		TVImages: 'http://localhost:8000/api/tv/1399/images',
		PopularTvList: 'http://localhost:8000/api/tv/popular',
		NowPlayingMoviesList: 'http://localhost:8000/api/movie/now_playing',
		PopularMoviesList: 'http://localhost:8000/api/movie/popular',
		TopRatedMoviesList: 'http://localhost:8000/api/movie/top_rated',
		UpcomingMoviesList: 'http://localhost:8000/api/movie/upcoming',
		LanguagesConfig: 'http://localhost:8000/api/configurations/languages',
		PrimaryLanguagesConfig: 'http://localhost:8000/api/configurations/primary/translations',
		MovieReviews: 'http://localhost:8000/api/movie/550/reviews',
		TvReviews: 'http://localhost:8000/api/tv/1399/reviews',
	}); // Spaghetti
});

router.use(TrendingMedia);
router.use(MediaGenresAndDiscover);
router.use(MediaData);
router.use(SearchMediaRouter);
router.use(MediaListRouter);
router.use(ConfigurationsAPI);

export default router;
export { EndpointSection };
