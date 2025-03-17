const CircleLoaderStart = (): React.JSX.Element => {
	return (
		<div className="flex flex-col items-center justify-start w-full min-h-screen">
			<div className="w-24 h-24 border-4 border-cyan-500 dark:border-cyan-500 border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
};

const CircleLoaderCenter = (): React.JSX.Element => {
	return (
		<div className="flex flex-col items-center justify-center w-full min-h-screen">
			<div className="w-24 h-24 border-4 border-cyan-500 dark:border-cyan-500 border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
		</div>
	);
};

export { CircleLoaderCenter, CircleLoaderStart };
