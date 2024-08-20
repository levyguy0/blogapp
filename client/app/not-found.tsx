import Link from "next/link";
import NavBar from "./components/NavBar";

export default function NotFound() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="w-screen h-[80vh] flex items-center justify-center flex-col">
        <h1 className="text-3xl font-extrabold">Page Not Found</h1>
        <Link href="/home" className="hover:underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
