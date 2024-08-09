import Comment from "@/models/Comment";

export default interface BlogPost {
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
