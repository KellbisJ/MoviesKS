import { langValuesES, langValuesEN } from '@/types/languages';
import { useEffect, useState } from 'react';
import { UseMenuLangInterface } from './types';

const useMenuLang = (): UseMenuLangInterface => {
	const MENU_LANG_STORAGE_KEY: string = 'MOVIESKS_MENU_LANG';
	const DEFAULT_MENU_LANG: string = 'es';

	const [menuLangValues, setMenuLangValues] = useState<string[]>([]);

	const [menuLangStored, setMenuLangStored] = useState<string>(() => {
		return localStorage.getItem(MENU_LANG_STORAGE_KEY) || DEFAULT_MENU_LANG;
	});

	useEffect(() => {
		if (menuLangStored === 'es') {
			setMenuLangValues(langValuesES);
		} else if (menuLangStored === 'en') {
			setMenuLangValues(langValuesEN);
		} else {
			localStorage.setItem(MENU_LANG_STORAGE_KEY, DEFAULT_MENU_LANG);
			setMenuLangValues(langValuesES);
			setMenuLangStored(DEFAULT_MENU_LANG);
		}
	}, [menuLangStored]);

	const updateMenuLang = (langK: string) => {
		if (langK !== 'es' && langK !== 'en') return;

		localStorage.setItem(MENU_LANG_STORAGE_KEY, langK);
		setMenuLangStored(langK);
	};

	return {
		menuLangValues,
		menuLangStored,
		updateMenuLang,
	};
};

export { useMenuLang };
