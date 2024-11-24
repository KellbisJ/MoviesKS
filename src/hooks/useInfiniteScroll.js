import { useEffect, useState } from 'react';

const useInfiniteScroll = (callback, isLoading, canLoadMore) => {
	useEffect(() => {
		const handleScroll = async () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

			if (scrollTop + clientHeight >= scrollHeight - 600 && !isLoading && canLoadMore) {
				callback();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [isLoading, canLoadMore, callback]);
};

export { useInfiniteScroll };
