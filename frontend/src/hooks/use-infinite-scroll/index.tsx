import { useEffect } from 'react';
import { UseInfiniteScrollHookPropsInterface } from '../../types/use-infinite-scroll-hook-props-interface';

const useInfiniteScroll = ({callback, isLoading, canLoadMore}: UseInfiniteScrollHookPropsInterface) => {
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

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

export { useInfiniteScroll };
