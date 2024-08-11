import Comment from "@/models/Comment";
import { z } from "zod";

export interface BlogPost {
  title: string;
  description: string;
  content: string;
  id: string;
  authorName: string;
  category: string;
  authorId: string;
  createdAt: string;
  comments: Comment[];
}

export const ValidPost = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required." })
    .max(60, { message: "Title must not be longer than 60 characters." }),
  description: z
    .string()
    .min(1, { message: "Description is required." })
    .max(120, {
      message: "Description must not be longer than 120 characters.",
    }),
  content: z.string().min(1, { message: "Content is required." }),
});
