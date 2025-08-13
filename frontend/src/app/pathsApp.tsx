import { useRoutes } from 'react-router-dom';

// VIEW COMPONENTS
import { Layout } from '@/components/layout';
import { Home } from '@/routes/home';
import { FilteredMedia } from '@/routes/filtered-media';
import { MediaAllMovie } from '../routes/media-all-movie';
import { SavedMedia } from '../routes/saved-media';
import { MediaAllTV } from '../routes/media-all-tv';
import { MediaDetail } from '../routes/media-detail';
import { MediaAllByCategory } from '../routes/media-all-by-category';
import { PageNotFound } from '../components/layout/page-not-found';
import { MediaBySearch } from '../routes/media-by-search';
import { SearchAboutPage } from '@/routes/search-about';
import { SearchDiscoverPage } from '@/routes/search-discover';
// VIEW COMPONENTS

const PathsApp = () => {
	const paths = useRoutes([
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: 'home',
					element: <Home />,
				},
				{
					path: 'movie',
					element: <FilteredMedia />,
				},
				{
					path: 'tv',
					element: <FilteredMedia />,
				},
				{
					path: 'movie/preview/genre/:id',
					element: <FilteredMedia />,
				},
				{
					path: 'tv/preview/genre/:id',
					element: <FilteredMedia />,
				},
				{
					path: 'movie/all',
					element: <MediaAllMovie />,
				},
				{
					path: 'tv/all',
					element: <MediaAllTV />,
				},
				{
					path: 'movie/detail/:id',
					element: <MediaDetail />,
				},
				{
					path: 'tv/detail/:id',
					element: <MediaDetail />,
				},
				{
					path: 'movie/all/category/:id',
					element: <MediaAllByCategory />,
				},
				{
					path: 'tv/all/category/:id',
					element: <MediaAllByCategory />,
				},
				{
					path: 'search/movie/:query',
					element: <MediaBySearch />,
				},
				{
					path: 'search/tv/:query',
					element: <MediaBySearch />,
				},
				{
					path: 'saved-media',
					element: <SavedMedia />,
				},
				{
					path: 'search/about/:query',
					element: <SearchAboutPage />,
				},
				{
					path: 'search/discover/movie',
					element: <SearchDiscoverPage />,
				},
				{
					path: 'search/discover/tv',
					element: <SearchDiscoverPage />,
				},
				{
					path: '*',
					element: <PageNotFound />,
				},
			],
		},
	]);
	return paths;
};

export { PathsApp };
