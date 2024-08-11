export default interface ShownUser {
  email: string;
  username: string;
  id: string;
  posts: Post[];
  message?: string;
}

interface Post {
  title: string;
  description: string;
  content: string;
  id: string;
  authorName: string;
  category: string;
  createdAt: string;
}
