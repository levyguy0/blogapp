"use client";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { BlogPost } from "../../models/BlogPost";
import Link from "next/link";
import { usePathname } from "next/navigation";
import updateDate from "@/utils/updateDate";

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}

const BlogFeed = ({ selectedCategory, setSelectedCategory }: Props) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const path = usePathname();

  useEffect(() => {
    if (!selectedCategory) {
      const fetchPosts = async () => {
        await axios
          .get("/api/posts", { withCredentials: true })
          .then((res: AxiosResponse) => {
            setPosts(res.data.posts);
          });
      };

      fetchPosts();
    } else {
      const fetchPosts = async () => {
        await axios
          .get(`/api/posts/bycategory?category=${selectedCategory}`, {
            withCredentials: true,
          })
          .then((res: AxiosResponse) => {
            setPosts(res.data.posts);
          });
      };

      fetchPosts();
    }
  }, [selectedCategory]);

  return (
    <div className="feed col-span-4 lg:col-span-3">
      <div>
        {posts.map((p) => (
          <div className="flex flex-col gap-4 p-4" key={p.id}>
            <div className="flex gap-2 justify-between">
              <div className="flex gap-2">
                <span className="badge badge-primary">{p.category}</span>
                <span className="badge badge-secondary hover:underline">
                  <Link
                    onClick={() => localStorage.setItem("lastLink", path)}
                    href={`/user/${p.authorName}`}
                  >
                    {p.authorName}
                  </Link>
                </span>
              </div>
              <div className="flex gap-2">
                <span className="badge badge-info">
                  {updateDate(p.createdAt)[0]}
                </span>
                <span className="hidden lg:block badge badge-info">
                  {updateDate(p.createdAt)[1]}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-lg">
                <Link
                  className=" hover:underline"
                  key={p.id}
                  href={`/post/${p.id}`}
                >
                  {p.title}
                </Link>
              </h1>
              <div>{p.description}</div>
            </div>
            <div className="divider divider-info"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogFeed;
