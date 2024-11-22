import React from "react";
import NavBar from "../components/NavBar";
import SignupCard from "../components/SignupCard";

const page = () => {
  return (
    <main>
      <NavBar></NavBar>
      <div className="flex w-screen h-screen justify-center items-center">
        {1 == 1 ? (
          <SignupCard></SignupCard>
        ) : (
          <div className="font-extrabold text-2xl flex flex-col items-center justify-center gap-2">
            <div className="">
              Website is in demo mode and so signups are temporarily disabled.
            </div>
            <div>Please try again later.</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
