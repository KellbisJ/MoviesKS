import { MksHeaderContent } from '@/components/common/mks-header-content';
import { SearchBar } from '@/components/common/search-bar';

const SearchView = (): React.JSX.Element => {
	return (
		<div className="min-h-screen flex justify-center items-start">
			<div className="container mx-auto px-4 sm:px-6 py-3">
				<MksHeaderContent />
				<SearchBar />
			</div>
		</div>
	);
};

export { SearchView };
