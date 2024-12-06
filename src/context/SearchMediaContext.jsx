import React, { createContext, useContext, useState } from 'react';

const searchContext = createContext();

const SearchProvider = ({ children }) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [mediaType, setMediaType] = useState('movies');

	const updateSearchQuery = (query) => {
		setSearchQuery(query);
	};
	const updateMediaType = (type) => {
		setMediaType(type);
	};

	return <searchContext.Provider value={{ searchQuery, updateSearchQuery, mediaType, updateMediaType }}>{children}</searchContext.Provider>;
};

const useSearch = () => {
	return useContext(searchContext);
};

export { SearchProvider, useSearch };
