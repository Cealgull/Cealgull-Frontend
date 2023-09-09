/*
 * id:the unique string to identify a topic
 *
 * cid:the unique string to identify the text content for a topic
 * we usually use it to request in ipfs api
 *
 */

interface Category {
  name: string;
  color: string;
}

interface Tag {
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
  hash: string;
  creator: SimpleUser;
  content: string;
  belongTo: string;
  replyTo: ForumPost | null;
  upvotes: string[];
  downvotes: string[];
  createAt: string;
  updateAt: string;
  assets: Asset[];
}
