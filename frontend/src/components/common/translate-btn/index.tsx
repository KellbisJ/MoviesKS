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
			className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-300 hover:bg-[#16C47F] dark:hover:bg-[#16C47F] transition-colors duration-300"
			aria-label={'translate'}
			onClick={() => {
				setShowLangSideBar(!showLangSidebar);
			}}>
			{<Languages size={20} />}
		</button>
	);
};

export { TranslateBtn };
