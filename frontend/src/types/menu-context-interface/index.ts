interface MenuContextInterface {
	showMenuComponents: boolean;
	setShowMenuComponents: React.Dispatch<React.SetStateAction<boolean>>;
	mediaType: string;
	setMediaType: React.Dispatch<React.SetStateAction<string>>;
	selectedGenre: string;
	setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
	genreSelected: string;
	setGenreSelected: React.Dispatch<React.SetStateAction<string>>;
}

export { MenuContextInterface };
