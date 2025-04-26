interface UseMenuLangInterface {
	menuLangValues: string[];
	menuLangStored: string | null;
	updateMenuLang: (langK: string) => void;
}

export { UseMenuLangInterface };
