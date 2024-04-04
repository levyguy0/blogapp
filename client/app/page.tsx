import Image from "next/image";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <div className="gap-4 flex-col h-screen w-screen flex justify-center items-center">
        <div className="text-5xl font-extrabold">Blogify</div>
        <div>When Medium is not enough.</div>
      </div>
    </main>
  );
}
