/*
 * id:the unique string to identify a topic
 *
 * cid:the unique string to identify the text content for a topic
 * we usually use it to request in ipfs api
 *
 */
interface ForumTopic {
  category: string;
  cid: string;
  createTime: string;
  creator: string;
  id: string;
  images: string[];
  tags: string[];
  title: string;
  updateTime: string;
}

/*
 * id:the unique string to identify a post
 *
 * cid:the unique string to identify the text content for a post
 * we usually use it to request in ipfs api
 *
 */
interface ForumPost {
  belongTo: string;
  cid: string;
  createTime: string;
  creator: string;
  id: string;
  images: string[];
  replyTo: string;
  updateTime: string;
}

interface UserInfo {
  avatar: string;
  username: string;
  identityId: string;
  signature: string;
  roles: string[];
  badge: string[];
}
