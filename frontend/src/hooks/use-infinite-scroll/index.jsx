import { useEffect } from 'react';

const useInfiniteScroll = (callback, isLoading, canLoadMore) => {
	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

			if (scrollTop + clientHeight >= scrollHeight - 200 && !isLoading && canLoadMore) {
				callback();
			}
		};

		const debouncedHandleScroll = debounce(handleScroll, 300);

		window.addEventListener('scroll', debouncedHandleScroll);
		return () => {
			window.removeEventListener('scroll', debouncedHandleScroll);
		};
	}, [isLoading, canLoadMore, callback]);
};

function debounce(func, wait) {
	let timeout;
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			func.apply(this, args);
		}, wait);
	};
}

export { useInfiniteScroll };
