import { BlogPost } from "@prisma/client";

export default interface ShownUser {
  email: string;
  username: string;
  id: string;
  posts: BlogPost[];
  message?: string;
}
