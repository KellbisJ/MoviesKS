import React, { createContext, useContext, useState } from 'react';
import { SearchContextInterface } from '../../types/search-context-interface';

const searchContext = createContext<SearchContextInterface>({
    searchQuery: '',
    updateSearchQuery: () => {},
    mediaType: 'movies',
    updateMediaType: () => {}
});

const SearchProvider = ({ children }: {children: React.ReactNode}) => {
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [mediaType, setMediaType] = useState<string>('movies');

	const updateSearchQuery = (query: string) => {
		setSearchQuery(query);
	};
	const updateMediaType = (type: string) => {
		setMediaType(type);
	};

	return <searchContext.Provider value={{ searchQuery, updateSearchQuery, mediaType, updateMediaType }}>{children}</searchContext.Provider>;
};

const useSearch = () => {
	return useContext(searchContext);
};

export { SearchProvider, useSearch };
