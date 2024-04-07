"use client";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import BlogPost from "../../models/BlogPost";
import ShownUser from "@/models/ShownUser";

interface Props {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}

const BlogFeed = ({ selectedCategory, setSelectedCategory }: Props) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!selectedCategory) {
      const fetchPosts = async () => {
        await axios
          .get("http://localhost:8080/posts", { withCredentials: true })
          .then((res: AxiosResponse) => {
            setPosts(res.data.posts);
          });
      };

      fetchPosts();
    } else {
      const fetchPosts = async () => {
        await axios
          .get(`http://localhost:8080/posts/${selectedCategory}`, {
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
    <div className="feed col-span-3">
      <div>
        {posts.map((p) => (
          <div className="flex flex-col gap-4 p-4" key={p.id}>
            <span className="badge badge-primary">{p.category}</span>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">{p.title}</h1>
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
