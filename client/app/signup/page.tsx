import React from "react";
import NavBar from "../components/NavBar";
import SignupCard from "../components/SignupCard";

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
