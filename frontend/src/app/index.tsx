import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuProvider } from '../context/menu-context';
import { Layout } from '../components/layout';
import { Home } from '../routes/home';
import { MediaMovie } from '../routes/media-movie';
import { MediaAllMovie } from '../routes/media-all-movie';
import { MediaPreviewByGenre } from '../routes/media-preview-by-genre';
import { MediaFavorites } from '../routes/media-favorites';
import { FavoriteMediaProvider } from '../context/favorite-media-context';
import { MediaTV } from '../routes/media-tv';
import { MediaAllTV } from '../routes/media-all-tv';
import { MediaDetail } from '../routes/media-detail';
import { MediaByCategory } from '../routes/media-by-category';
import { PageNotFound } from '../components/page-not-found';
import { MediaBySearch } from '../routes/media-by-search';
import { SearchProvider } from '../context/search-media-context';

const App = (): React.JSX.Element => (
	<MenuProvider>
		<FavoriteMediaProvider>
			<SearchProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							<Route path="home" element={<Home />} />
							<Route path="movies" element={<MediaMovie />} />
							<Route path="movies/all" element={<MediaAllMovie />} />
							<Route path="tv" element={<MediaTV />} />
							<Route path="tv/all" element={<MediaAllTV />} />
							<Route path=":type/preview/genre/:id" element={<MediaPreviewByGenre />} />
							<Route path=":type/detail/:id" element={<MediaDetail />} />
							<Route path=":type/category/:id" element={<MediaByCategory />} />
							<Route path="search/:type/:query" element={<MediaBySearch />} />
							<Route path="favorites" element={<MediaFavorites />} />
							<Route path="*" element={<PageNotFound />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</SearchProvider>
		</FavoriteMediaProvider>
	</MenuProvider>
);

export { App };
