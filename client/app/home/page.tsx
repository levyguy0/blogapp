"use client";
import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";

const page = () => {
  return (
    <main>
      <NavBar></NavBar>
      <div className="flex w-screen h-screen justify-center items-center">
        <div>hello</div>
      </div>
    </main>
  );
};

export default page;
