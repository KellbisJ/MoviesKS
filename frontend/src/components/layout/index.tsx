import { Outlet } from 'react-router-dom';
import { Menu } from '../Menu';
import { Footer } from '../Footer';

const Layout = (): React.JSX.Element => (
	<main className="bg-stone-100 flex flex-col min-h-screen dark:bg-slate-900 transition">
		<Menu />
		<div className="flex-1 min-h-screen mt-16 p-6 lg:p-8">
			<Outlet />
		</div>
		<Footer />
	</main>
);

export { Layout };
