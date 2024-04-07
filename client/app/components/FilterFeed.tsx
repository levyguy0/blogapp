"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const FilterFeed = ({ selectedCategory, setSelectedCategory }: Props) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      await axios
        .get("http://localhost:8080/posts/category/all", {
          withCredentials: true,
        })
        .then((res) => {
          setCategories(res.data.categories);
        });
    };

    fetchCategories();
  }, []);

  return (
    <div className="filter col-span-1">
      <ul className="menu bg-base-200 rounded-box">
        <li>
          <button onClick={() => setSelectedCategory(null)}>RECENT</button>
        </li>
        {categories.map((c) => (
          <li key={c}>
            <button onClick={() => setSelectedCategory(c)}>{c}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterFeed;
