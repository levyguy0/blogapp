"use client";
import NavBar from "@/app/components/NavBar";
import BlogPost from "@/models/BlogPost";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { postid: string } }) => {
  const [user, setUser] = useState<ShownUser | null>();
  const [post, setPost] = useState<BlogPost>();

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

    const getPost = async () => {
      await axios
        .get(`http://localhost:8080/posts/byid/${params.postid}`, {
          withCredentials: true,
        })
        .then((res: any) => {
          setPost(res.data.post);
        });
    };

    getPost();
  }, []);

  const handleDeletePost = async () => {
    await axios
      .delete("http://localhost:8080/posts/", {
        data: { id: post?.id },
        withCredentials: true,
      })
      .then(() => {
        location.replace("/home");
      });
  };

  return (
    <main>
      <NavBar user={user}></NavBar>
      <div className="grid grid-cols-4 grid-rows-4 p-4">
        <div className="col-span-1 row-span-4 p-4">
          <ul className="menu bg-base-200 rounded-box">
            <li>
              <Link href={"/home"}>
                <button>Back</button>
              </Link>
            </li>
            {post?.authorId == user?.id && (
              <li>
                <button onClick={handleDeletePost}>Delete</button>
              </li>
            )}
          </ul>
        </div>
        <div className="col-span-3 row-span-1 p-4 flex flex-col">
          <div className="text-5xl font-bold mb-10 text-info">
            {post?.title}
          </div>
          <div className="text-xl">{post?.description}</div>
          <div className="divider divider-secondary"></div>
        </div>
        <div className="col-span-3 row-span-3 px-4">
          <div className="text-md">{post?.content}</div>
        </div>
      </div>
    </main>
  );
};

export default page;
