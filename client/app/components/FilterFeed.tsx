"use client";
//TODO add drawer for the menu when on mobile
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
        .get("/api/category/all", {
          withCredentials: true,
        })
        .then((res) => {
          setCategories(res.data.categories);
        });
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* ---------------------------------------- */}
      <div className="lg:block hidden">
        <div className="filter lg:col-span-1">
          <ul className="menu bg-base-200 rounded-box">
            {!selectedCategory ? (
              <li className="font-bold">
                <button onClick={() => setSelectedCategory(null)}>
                  RECENT
                </button>
              </li>
            ) : (
              <li>
                <button onClick={() => setSelectedCategory(null)}>
                  RECENT
                </button>
              </li>
            )}

            {categories.map((c) => (
              <div key={c}>
                {c == selectedCategory ? (
                  <li key={c} className="font-bold">
                    <button onClick={() => setSelectedCategory(c)}>{c}</button>
                  </li>
                ) : (
                  <li key={c}>
                    <button onClick={() => setSelectedCategory(c)}>{c}</button>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FilterFeed;
