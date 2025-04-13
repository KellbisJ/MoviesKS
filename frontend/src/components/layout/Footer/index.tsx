const Footer = (): React.JSX.Element => {
	return (
		<footer className="bg-transparent text-gray-700 dark:text-white text-center py-5 w-full min-h-72 h-72 text-base p-2 transition">
			<div className="flex flex-col justify-end w-full h-full gap-2">
				<p className="m-0">
					This website was created using{' '}
					<a
						href="https://www.themoviedb.org/documentation/api"
						className="no-underline transition-colors duration-300 hover:text-cyan-400 dark:hover:text-cyan-400">
						TheMovieDB API
					</a>
				</p>
				<p>Kellbis Salazar</p>
				<div className="flex justify-center gap-4">
					<a
						href="https://github.com/KellbisJ/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#9fa6b0] hover:text-cyan-400 dark:hover:text-cyan-400 no-underline text-sm  transition-colors duration-300 flex items-center justify-center">
						GitHub
					</a>
					<a
						href="https://www.linkedin.com/in/kellbis-salazar-arnaez-3a844833a/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-[#9fa6b0] hover:text-cyan-400 dark:hover:text-cyan-400 no-underline text-sm transition-colors duration-300 flex items-center justify-center">
						LinkedIn
					</a>
				</div>
			</div>
		</footer>
	);
};

export { Footer };
