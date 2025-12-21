import { useLanguages } from '@/context/lang';
import { isSpanishLang } from '@/utils/is-spanish-lang';

const MksHeaderContent = (): React.JSX.Element => {
	const { language } = useLanguages();
	return (
		<div className="flex flex-col items-center gap-1 text-center mt-4 mb-4">
			<div className="relative mb-2">
				<h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 p-1">
					MoviesKS
				</h1>
				<div className="absolute inset-0 christmas-lights rounded-lg opacity-20 dark:opacity-15"></div>
			</div>

			<p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
				{isSpanishLang(language)
					? `Explora y descubre información detallada sobre tus películas y series favoritas.
								Solo explora y recopila información.`
					: `Explore and discover detailed information about your favorite movies and TV shows. Only explore and pick up information.`}
			</p>
		</div>
	);
};

export { MksHeaderContent };
