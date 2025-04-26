import { Location } from 'react-router-dom';

const underlinePath = (basePath: string, location: Location<any>) => {
	if (basePath === '/') {
		return location.pathname === '/' || location.pathname === '/home';
	}
	return location.pathname.startsWith(basePath);
};

export { underlinePath };
