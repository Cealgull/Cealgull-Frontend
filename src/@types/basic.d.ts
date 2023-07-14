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
  roles?: string[];
  badge?: string[];
}
