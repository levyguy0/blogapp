"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import BlogFeed from "../components/BlogFeed";
import FilterFeed from "../components/FilterFeed";

const page = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <main>
      <NavBar></NavBar>
      <div className="lg:grid lg:grid-cols-4 gap-10 p-4 relative">
        <FilterFeed
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
          setNumberOfPages={setNumberOfPages}
        ></FilterFeed>
        <BlogFeed
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
          setNumberOfPages={setNumberOfPages}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        ></BlogFeed>
      </div>
    </main>
  );
};

export default page;
