export interface returnTopicProps {
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

export interface returnPostProps {
  belongTo: string;
  cid: string;
  createTime: string;
  creator: string;
  id: string;
  images: string[];
  replyTo: string;
  updateTime: string;
}

export interface createTopicProps {
  content: string;
  images: string[];
  title: string;
  category: string;
  tags?: string[];
}

export interface createPostProps {
  content: string;
  images: string[];
  replyTo: string;
  belongTo: string;
}

export interface returnUserProps {
  avatar: string;
  username: string;
  identityId: string;
  signature: string;
  roles?: string[];
  badge?: string[];
}
