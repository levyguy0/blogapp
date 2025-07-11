"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { insertText } from "@/utils/formatPostContent";
import PostMarkdown from "../components/PostMarkdown";

interface FieldError {
  msg: string;
  path: string;
}

const WritePage = () => {
  const [categoryError, setCategoryError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");
  const [focused, setFocused] = useState(false);
  const [contentError, setContentError] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const [categories, setCategories] = useState<string[]>([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");

  const selectRef = useRef<HTMLSelectElement>(null);

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

  const handleUpload = async () => {
    setDescError("");
    setTitleError("");
    setContentError("");
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
      .post("/api/posts", post, { withCredentials: true })
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
      <NavBar></NavBar>
      <div className="p-10 flex flex-col gap-8">
        <h1 className="font-bold text-3xl text-info text-center md:text-left">
          Create a Blog Post
        </h1>

        <div className="blog-title flex flex-col gap-2">
          <textarea
            id="title-editor"
            rows={3}
            onChange={(e) => setTitle(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Title"
          ></textarea>
          <p className="text-error text-sm">{titleError}</p>
        </div>
        <div className="blog-desc flex flex-col gap-2">
          <textarea
            id="desc-editor"
            rows={6}
            onChange={(e) => setDesc(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
          ></textarea>
          <p className="text-error text-sm">{descError}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="hidden md:flex">
            <PostMarkdown
              contentRef={contentRef}
              content={content}
              setContent={setContent}
            ></PostMarkdown>
          </div>
          <div className="blog-content gap-2">
            <textarea
              id="content-editor"
              ref={contentRef}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="textarea textarea-bordered w-full"
              placeholder="Content"
              value={content}
            ></textarea>
            <p className="text-error text-sm">{contentError}</p>
          </div>
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
    </main>
  );
};

export default WritePage;
