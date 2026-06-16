import { apiClient, API_CONFIG_LANGUAGES } from "..";
import { LanguagesInterface } from "@/types/languages";

async function getConfigLanguages(): Promise<LanguagesInterface[]> {
  try {
    const languages =
      await apiClient<LanguagesInterface[]>(API_CONFIG_LANGUAGES);
    return languages;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { getConfigLanguages };
