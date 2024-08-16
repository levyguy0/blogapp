import { BlogPost } from "../models/BlogPost";

export default interface ShownUser {
  email: string;
  username: string;
  id: string;
  posts: BlogPost[];
  message?: string;
  following: ShownUser[];
  followers: ShownUser[];
}
