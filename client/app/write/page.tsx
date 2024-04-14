"use client";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";

const page = () => {
  const [user, setUser] = useState<ShownUser | null>();
  const [categoryError, setCategoryError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("http://localhost:8080/users/me", { withCredentials: true })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
          } else {
            location.replace("/login");
          }
        })
        .catch((err) => {
          location.replace("/login");
        });
    };

    checkLoggedIn();

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

  const handleUpload = async () => {
    const title = titleRef.current?.value;
    const desc = descRef.current?.value;
    const content = contentRef.current?.value;
    const category = selectRef.current?.value;

    console.log(title == "");

    if (category == "Category") {
      setCategoryError("Must select a category.");
      return;
    }

    setCategoryError("");

    const post = {
      title: title,
      description: desc,
      content: content,
      category: category,
    };

    await axios
      .post("http://localhost:8080/posts/", post, { withCredentials: true })
      .then(() => {
        location.replace("/home");
      });
  };

  return (
    <main>
      <NavBar user={user}></NavBar>
      <div className="p-10 flex flex-col gap-8">
        <h1 className="font-bold text-3xl text-info">Create a Blog Post</h1>
        <div className="grid grid-rows-8 gap-4">
          <textarea
            ref={titleRef}
            className="textarea textarea-bordered w-full"
            placeholder="Title"
          ></textarea>
          <textarea
            ref={descRef}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
          ></textarea>
          <textarea
            ref={contentRef}
            className="textarea textarea-bordered row-span-5"
            placeholder="Content"
          ></textarea>
          <div className="flex flex-col">
            <select
              defaultValue={"Category"}
              className="select select-bordered w-full max-w-xs"
              ref={selectRef}
            >
              <option disabled>Category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className="text-error text-sm">{categoryError}</div>
          </div>
          <button className="btn" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </main>
  );
};

export default page;
