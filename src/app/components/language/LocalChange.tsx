"use client";
import { useChangeLocale, useCurrentLocale } from "../../locales/client";

export default function LocaleChange() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <section className="flex gap-4">
      <button
        onClick={() => changeLocale("en")}
        className="border border-gray-300 p-1"
      >
        English
      </button>
      <button
        onClick={() => changeLocale("ka")}
        className="border border-gray-300 p-1"
      >
        Georgian
      </button>
    </section>
  );
}
