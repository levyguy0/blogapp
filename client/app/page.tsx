import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import { useEffect, useState } from "react";
import axios from "axios";
import ShownUser from "@/models/ShownUser";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <Hero></Hero>
    </main>
  );
}
