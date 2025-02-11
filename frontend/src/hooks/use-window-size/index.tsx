import { useState, useEffect } from 'react';

const useWindowSize = () => {
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 768);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return { isMobile };
};

export { useWindowSize };
