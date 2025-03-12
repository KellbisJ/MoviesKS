const Footer = (): React.JSX.Element => {
	return (
		<footer className="bg-fuchsia-700 dark:bg-slate-950 text-white text-center py-5 w-full shadow-[0_-2px_10px_rgba(0,0,0,0.2)] text-[0.875rem] relative p-2 transition">
			<p className="m-0 text-[1rem]">
				This website was created using{' '}
				<a
					href="https://www.themoviedb.org/documentation/api"
					className="text-[#9fa6b0] no-underline transition-colors duration-300 hover:text-white">
					TheMovieDB API
				</a>
			</p>
			<div className="flex justify-center gap-4 my-2">
				<a
					href="https://github.com/KellbisJ/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#9fa6b0] no-underline text-[1.5rem] transition-colors duration-300 flex items-center justify-center">
					<i className="fab fa-github"></i>
				</a>
				<a
					href="https://www.linkedin.com/in/kellbis-salazar-arnaez-3a844833a/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#9fa6b0] no-underline text-[1.5rem] transition-colors duration-300 flex items-center justify-center">
					<i className="fab fa-linkedin"></i>
				</a>
			</div>
			<p className="m-0 text-[1rem]">Kellbis Salazar</p>
		</footer>
	);
};

export { Footer };
