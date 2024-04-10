export default interface ShownUser {
  email: string;
  username: string;
  id: string;
  posts: Post[];
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
