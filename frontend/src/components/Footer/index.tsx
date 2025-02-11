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
			<div className="flex justify-center gap-4 mt-5">
				<a
					href="https://instagram.com/salazarkellbis/"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#9fa6b0] no-underline text-[1.5rem] transition-colors duration-300 flex items-center justify-center">
					<i className="fab fa-instagram"></i>
				</a>
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
				<a
					href="https://www.workana.com/freelancer/e072aa54f79255ba72152fc89c698d31"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#9fa6b0] no-underline text-[1.5rem] transition-colors duration-300 flex items-center justify-center">
					<img
						src="https://wkncdn.com/newx/assets/build/img/logos/mobile_logo.16f3a81b5.svg"
						alt="Workana"
						className="w-[1.5rem] h-[1.5rem] transition-transform duration-300 hover:scale-110"
					/>
				</a>
			</div>
			<p className="m-0 text-[1rem]">Kellbis Salazar</p>
		</footer>
	);
}

export { Footer };
