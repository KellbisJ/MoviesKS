interface TrailerMediaModalPropsInterface {
	isOpen: boolean;
	onClose: () => void;
	videoKey: string | undefined;
	/** Video name or media title, used for the dialog and iframe labels. */
	title: string;
	isEs: boolean;
}
export { TrailerMediaModalPropsInterface };
