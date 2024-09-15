"use client";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../models/BlogPost";
import Link from "next/link";
import updateDate from "@/utils/updateDate";
import Pagination from "./Pagination";

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  numberOfPages: number;
  setNumberOfPages: (num: number) => void;
  page: number;
  setPage: (num: number) => void;
}

const BlogFeed = ({
  selectedCategory,
  setSelectedCategory,
  numberOfPages,
  setNumberOfPages,
  page,
  setPage,
}: Props) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    if (!selectedCategory) {
      const fetchPosts = async () => {
        await axios
          .get(`/api/posts?page=${page}`, { withCredentials: true })
          .then((res: AxiosResponse) => {
            setPosts(res.data.posts);
            setNumberOfPages(res.data["numberOfPages"]);
          });
      };

      fetchPosts();
    } else {
      const fetchPosts = async () => {
        await axios
          .get(
            `/api/posts/bycategory?category=${selectedCategory}&page=${page}`,
            {
              withCredentials: true,
            }
          )
          .then((res: AxiosResponse) => {
            setPosts(res.data.posts);
            setNumberOfPages(res.data["numberOfPages"]);
          });
      };

      fetchPosts();
    }
  }, [selectedCategory, page]);

  return (
    <div className="feed col-span-4 lg:col-span-3">
      <div>
        {posts ? (
          posts.map((p) => (
            <div className="flex flex-col gap-4 p-4" key={p.id}>
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <span className="badge badge-sm lg:badge-md badge-primary">
                    {p.category}
                  </span>
                  <span className="badge badge-sm lg:badge-md badge-secondary hover:underline">
                    <Link href={`/user/${p.authorName}`}>{p.authorName}</Link>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="badge badge-info badge-sm lg:badge-md">
                    {updateDate(p.createdAt)[0]}
                  </span>
                  <span className="hidden lg:block badge badge-info">
                    {updateDate(p.createdAt)[1]}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-md lg:text-lg overflow-hidden text-ellipsis whitespace-nowrap max-w-[30ch] md:max-w-full">
                  <Link
                    className=" hover:underline"
                    key={p.id}
                    href={`/post/${p.id}`}
                  >
                    {p.title}
                  </Link>
                </h1>
                <div className="text-sm lg:text-md overflow-hidden text-ellipsis whitespace-nowrap max-w-[30ch] md:max-w-[70ch] lg:max-w-full">
                  {p.description}
                </div>
              </div>
              <div className="divider divider-info"></div>
            </div>
          ))
        ) : (
          <div className="w-screen lg:w-[80%] text-center my-2 font-bold flex flex-col items-center justify-center">
            <div>No posts here yet. </div>
            {selectedCategory && (
              <div>
                Post something to get{" "}
                <span className="badge badge-neutral text-secondary">
                  {selectedCategory}
                </span>{" "}
                started!
              </div>
            )}
          </div>
        )}
        {posts && (
          <Pagination
            page={page}
            numberOfPages={numberOfPages}
            setPage={setPage}
          ></Pagination>
        )}
      </div>
    </div>
  );
};

export default BlogFeed;
