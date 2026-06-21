const PageNotFound = (): React.JSX.Element => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-bg-main dark:bg-dark-bg-main p-4">
      <div className="max-w-md w-full">
        <h1 className="text-5xl font-bold text-primary dark:text-dark-primary mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-text-high dark:text-dark-text-high mb-2">
          Page Not Found
        </h2>
        <p className="text-lg text-text-low dark:text-dark-text-low mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/home"
          className="inline-block px-6 py-3 bg-accent dark:bg-dark-accent text-white rounded-full hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-colors duration-300 font-medium">
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export { PageNotFound };
