import Search from "./Search";

export default async function SearchWrapper({ locale }: { locale: string }) {
  return <Search locale={locale} />;
}
