"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogPost from "../../models/BlogPost";

const BlogFeed = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get("http://localhost:8080/posts", { withCredentials: true })
        .then((res) => {
          setPosts(res.data.posts);
        });
    };

    fetchPosts();
  }, []);

  return (
    <div className="feed col-span-3">
      <div>
        {posts.map((p) => (
          <div className="flex flex-col gap-4 p-4">
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
