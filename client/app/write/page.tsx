"use client";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";

interface FieldError {
  msg: string;
  path: string;
}

const page = () => {
  const [user, setUser] = useState<ShownUser | null>();
  const [categoryError, setCategoryError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [contentError, setContentError] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("/api/users/me", { withCredentials: true })
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
        .get("/api/category/all", {
          withCredentials: true,
        })
        .then((res) => {
          setCategories(res.data.categories);
        });
    };

    fetchCategories();
  }, []);

  const handleUpload = async () => {
    setDescError("");
    setTitleError("");
    setContentError("");

    const title = titleRef.current?.value;
    const desc = descRef.current?.value;
    const content = contentRef.current?.value;
    const category = selectRef.current?.value;

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
      .post("/api/posts/", post, { withCredentials: true })
      .then(() => {
        location.replace("/home");
      })
      .catch((error) => {
        error.response.data.issues.forEach((err: any) => {
          switch (err.path[0]) {
            case "title":
              setTitleError(err.message);
              break;
            case "description":
              setDescError(err.message);
              break;
            case "content":
              setContentError(err.message);
              break;
          }
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  };

  return (
    <main>
      <NavBar user={user}></NavBar>
      <div className="p-10 flex flex-col gap-8">
        <h1 className="font-bold text-3xl text-info">Create a Blog Post</h1>
        <div className="grid grid-rows-8 gap-4">
          <div className=" row-span-1 grid grid-rows-6 gap-2">
            <textarea
              ref={titleRef}
              className="textarea textarea-bordered w-full row-span-5"
              placeholder="Title"
            ></textarea>
            <p className="text-error text-sm row-span-1">{titleError}</p>
          </div>
          <div className=" row-span-2 grid grid-rows-6 gap-2">
            <textarea
              ref={descRef}
              className="textarea textarea-bordered w-full row-span-5"
              placeholder="Description"
            ></textarea>
            <p className="text-error text-sm row-span-1">{descError}</p>
          </div>
          <div className="gap-2 row-span-5 grid grid-rows-6">
            <textarea
              ref={contentRef}
              className="textarea textarea-bordered w-full  row-span-5"
              placeholder="Content"
            ></textarea>
            <p className="text-error text-sm row-span-1">{contentError}</p>
          </div>
          <div className="flex flex-col gap-2">
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
