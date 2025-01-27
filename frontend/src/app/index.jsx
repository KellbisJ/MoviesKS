import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MenuProvider } from '../context/MenuContext';
import { Layout } from '../components/layout';
import { Home } from '../routes/Home';
import { MediaMovie } from '../routes/MediaMovie';
import { MediaAllMovie } from '../routes/MediaAllMovie';
import { MediaPreviewByGenre } from '../routes/MediaPreviewByGenre';
import { MediaFavorites } from '../routes/MediaFavorites';
import { FavoriteMediaProvider } from '../context/FavoriteMediaContext';
import { MediaTV } from '../routes/MediaTV';
import { MediaAllTV } from '../routes/MediaAllTV';
import { MediaDetail } from '../routes/MediaDetail';
import { MediaByCategory } from '../routes/MediaByCategory';
import { PageNotFound } from '../components/page-not-found';
import { MediaBySearch } from '../routes/MediaBySearch';
import { SearchProvider } from '../context/SearchMediaContext';

const App = () => (
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
