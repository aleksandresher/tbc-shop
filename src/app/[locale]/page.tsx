import LocaleChange from "../components/language/LocalChange";
import Login from "../components/authorization/Login";
import SignOut from "../components/authorization/SignOut";

export default function Home() {
  return (
    <main className="flex gap-4  ">
      <LocaleChange />
      <h1>Home page</h1>

      <SignOut />
    </main>
  );
}

