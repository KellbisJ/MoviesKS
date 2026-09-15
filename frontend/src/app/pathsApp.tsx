import { useRoutes } from 'react-router-dom';

// VIEW COMPONENTS
import { Layout } from '@/components/layout';
import { Home } from '@/routes/home';
import { FilteredMedia } from '@/routes/filtered-media';
import { LegacyBrowseRedirect } from '@/routes/filtered-media/LegacyBrowseRedirect';
import { SavedMedia } from '../routes/saved-media';
import { MediaDetail } from '../routes/media-detail';
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
					element: <LegacyBrowseRedirect />,
				},
				{
					path: 'tv/preview/genre/:id',
					element: <LegacyBrowseRedirect />,
				},
				{
					path: 'movie/all',
					element: <LegacyBrowseRedirect />,
				},
				{
					path: 'tv/all',
					element: <LegacyBrowseRedirect />,
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
					element: <LegacyBrowseRedirect />,
				},
				{
					path: 'tv/all/category/:id',
					element: <LegacyBrowseRedirect />,
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
