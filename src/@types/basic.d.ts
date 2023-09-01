/*
 * id:the unique string to identify a topic
 *
 * cid:the unique string to identify the text content for a topic
 * we usually use it to request in ipfs api
 *
 */

interface Category {
  id: number;
  name: string;
  color: number;
}

interface Tag {
  description: string;
  name: string;
}

interface Asset {
  creator: string;
  contentType: string;
  createdAt: string;
  updatedAt: string;
  cid: string;
}

interface SimpleUser {
  username: string;
  wallet: string;
  avatar: string;
  badge: string;
  role: string;
}

interface ForumTopic {
  id: number;
  hash: string;
  title: string;
  creator: SimpleUser;
  avatar: string;
  content: string;
  categoryAssigned: Category;
  tagsAssigned: Tag[];
  upvotes: string[];
  downvotes: string[];
  assets: Asset[];
  closed: boolean;
  createdAt: string;
  updatedAt: string;
}

/*
 * id:the unique string to identify a post
 *
 * cid:the unique string to identify the text content for a post
 * we usually use it to request in ipfs api
 *
 */
interface ForumPost {
  id: number;
  hash: string;
  creator: SimpleUser;
  content: string;
  createAt: string;
  updateAt: string;
  replyTo: ForumPost | null;
  assets: Asset[];
  upvotes: string[];
  downvotes: string[];
  belongTo: string;
}
