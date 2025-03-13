import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Home } from '@/routes/home';
import { FilteredMedia } from '@/routes/filtered-media';
import { MediaAllMovie } from '../routes/media-all-movie';
import { MediaFavorites } from '../routes/media-favorites';
import { FavoriteMediaProvider } from '../context/favorite-media-context';
import { MediaAllTV } from '../routes/media-all-tv';
import { MediaDetail } from '../routes/media-detail';
import { MediaAllByCategory } from '../routes/media-all-by-category';
import { PageNotFound } from '../components/page-not-found';
import { MediaBySearch } from '../routes/media-by-search';
import { SearchProvider } from '../context/search-media-context';
import { ThemeContextProvider } from '@/context/theme/indext';

const App = (): React.JSX.Element => (
	<ThemeContextProvider>
		<FavoriteMediaProvider>
			<SearchProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="home" element={<Home />} />
							<Route path=":type" element={<FilteredMedia />} />
							<Route path=":type/preview/genre/:id" element={<FilteredMedia />} />
							<Route path="movies/all" element={<MediaAllMovie />} />
							<Route path="tv/all" element={<MediaAllTV />} />
							<Route path=":type/detail/:id" element={<MediaDetail />} />
							<Route path=":type/all/category/:id" element={<MediaAllByCategory />} />
							<Route path="search/:type/:query" element={<MediaBySearch />} />
							<Route path="favorites" element={<MediaFavorites />} />
							<Route path="*" element={<PageNotFound />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</SearchProvider>
		</FavoriteMediaProvider>
	</ThemeContextProvider>
);

export { App };
