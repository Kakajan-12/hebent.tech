import { useLocale } from "next-intl";

type Locales = "en" | "ru" | "tk";

const useAppLocale = (): Locales => {
  const locale = useLocale() as Locales;
  return locale;
};

export default useAppLocale;
