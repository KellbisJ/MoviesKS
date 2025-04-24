import { Languages } from 'lucide-react';

const TranslateBtn = ({
	showLangSidebar,
	setShowLangSideBar,
}: {
	showLangSidebar: boolean;
	setShowLangSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<button
			type="button"
			className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-600 hover:text-cyan-500 dark:text-gray-300 hover:bg-cyan-500 dark:hover:bg-cyan-500 transition-colors duration-300"
			aria-label={'translate'}
			onClick={() => {
				setShowLangSideBar(!showLangSidebar);
			}}>
			{<Languages size={20} className="text-black dark:text-gray-300" />}
		</button>
	);
};

export { TranslateBtn };
