import React, { createContext, useContext, useState } from 'react';
import { SearchContextInterface } from './types';
import { MediaTypeT } from '@/types/media-type';

const searchContext = createContext<SearchContextInterface>({
	searchQuery: '',
	updateSearchQuery: () => {},
	mediaType: MediaTypeT.movie,
	updateMediaType: (type: MediaTypeT) => {},
});

const SearchProvider = ({ children }: { children: React.ReactNode }) => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [mediaType, setMediaType] = useState<MediaTypeT>(MediaTypeT.movie);

	const updateSearchQuery = (query: string) => {
		setSearchQuery(query);
	};
	const updateMediaType = (type: MediaTypeT) => {
		setMediaType(type);
	};

	return <searchContext.Provider value={{ searchQuery, updateSearchQuery, mediaType, updateMediaType }}>{children}</searchContext.Provider>;
};

const useSearch = () => {
	return useContext(searchContext);
};

export { SearchProvider, useSearch };
