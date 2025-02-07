const PageNotFound = ():React.JSX.Element => {
	return (
		<div className="flex flex-col justify-center items-center h-screen text-center bg-gray-900">
			<h1 className="text-3xl text-red-600">404 - Page Not Found</h1>
			<p className="text-lg text-gray-500">
				Vuelve al{' '}
				<a href="/" className="text-blue-500 hover:underline">
					homepage
				</a>
				.
			</p>
		</div>
	);
}

export { PageNotFound };
