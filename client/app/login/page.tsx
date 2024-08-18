import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import LoginCard from "../components/LoginCard";

const page = () => {
  return (
    <main>
      <NavBar></NavBar>
      <div className="flex w-screen h-screen justify-center items-center">
        <LoginCard></LoginCard>
      </div>
    </main>
  );
};

export default page;
