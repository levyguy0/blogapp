import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SignupCard from "../components/SignupCard";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  return (
    <main>
      <NavBar></NavBar>
      <div className="flex w-screen h-screen justify-center items-center">
        <SignupCard></SignupCard>
      </div>
    </main>
  );
};

export default page;
