import { BrowserRouter, Routes, Route } from 'react-router-dom';

// PROVIDERS
import { LanguagesProvider } from '@/context/lang';
import { ThemeContextProvider } from '@/context/theme/indext';
import { SavedMediaProvider } from '../context/favorite-media-context';
import { SearchProvider } from '../context/search-media-context';
// PROVIDERS

import { PathsApp } from './pathsApp';

const App = (): React.JSX.Element => (
	<LanguagesProvider>
		<ThemeContextProvider>
			<SavedMediaProvider>
				<SearchProvider>
					<BrowserRouter>
						<PathsApp />
					</BrowserRouter>
				</SearchProvider>
			</SavedMediaProvider>
		</ThemeContextProvider>
	</LanguagesProvider>
);

export { App };
