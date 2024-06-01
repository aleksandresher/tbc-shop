"use client";
import { useChangeLocale, useCurrentLocale } from "../../locales/client";

export default function LocaleChange() {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <section className="flex gap-4">
      <button onClick={() => changeLocale("en")}>English</button>
      <button onClick={() => changeLocale("ka")}>Georgian</button>
    </section>
  );
}
