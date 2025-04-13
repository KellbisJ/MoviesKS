import { BrowserRouter, Routes, Route } from 'react-router-dom';

// PROVIDERS
import { ThemeContextProvider } from '@/context/theme/indext';
import { SavedMediaProvider } from '../context/favorite-media-context';
import { SearchProvider } from '../context/search-media-context';
// PROVIDERS

// VIEW COMPONENTS
import { Layout } from '../components/layout';
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

const App = (): React.JSX.Element => (
	<ThemeContextProvider>
		<SavedMediaProvider>
			<SearchProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="home" element={<Home />} />
							<Route path="/movie" element={<FilteredMedia />} />
							<Route path="/tv" element={<FilteredMedia />} />
							<Route path=":type/preview/genre/:id" element={<FilteredMedia />} />
							<Route path="movie/all" element={<MediaAllMovie />} />
							<Route path="tv/all" element={<MediaAllTV />} />
							<Route path=":type/detail/:id" element={<MediaDetail />} />
							<Route path=":type/all/category/:id" element={<MediaAllByCategory />} />
							<Route path="search/:type/:query" element={<MediaBySearch />} />
							<Route path="saved-media" element={<SavedMedia />} />
							<Route path="/search/about/:query" element={<SearchAboutPage />} />
							<Route path="/search/discover/:type" element={<SearchDiscoverPage />} />
							<Route path="*" element={<PageNotFound />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</SearchProvider>
		</SavedMediaProvider>
	</ThemeContextProvider>
);

export { App };
