"use client";
//TODO add drawer for the menu when on mobile
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  numberOfPages: number;
  setNumberOfPages: (num: number) => void;
  page: number;
  setPage: (num: number) => void;
}

const FilterFeed = ({
  selectedCategory,
  setSelectedCategory,
  numberOfPages,
  setNumberOfPages,
  page,
  setPage,
}: Props) => {
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
      <div className="">
        <div className="lg:col-span-1 mb-4">
          <ul className="menu bg-base-200 rounded-box">
            {!selectedCategory ? (
              <li className="font-bold">
                <button
                  onClick={() => {
                    setPage(1);
                    setSelectedCategory(null);
                  }}
                >
                  RECENT
                </button>
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    setPage(1);
                    setSelectedCategory(null);
                  }}
                >
                  RECENT
                </button>
              </li>
            )}

            {categories.map((c) => (
              <div key={c}>
                {c == selectedCategory ? (
                  <li key={c} className="font-bold">
                    <button
                      onClick={() => {
                        setPage(1);
                        setSelectedCategory(c);
                      }}
                    >
                      {c}
                    </button>
                  </li>
                ) : (
                  <li key={c}>
                    <button
                      onClick={() => {
                        setPage(1);
                        setSelectedCategory(c);
                      }}
                    >
                      {c}
                    </button>
                  </li>
                )}
              </div>
            ))}
          </ul>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
        ></Pagination>
      </div>
    </>
  );
};

export default FilterFeed;
