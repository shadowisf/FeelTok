export type User = {
  uid: string;
  email: string;
  name: string;
  username: string;
  fullName: string;
  profilePicture: string;
  provider: string;
  emailVerified: boolean;
  otpStatus: boolean;
  userSince: string;
  lastLogin: string;
  isDisabled: boolean;
  year: string;
};

export type UserReport = {
  reportID: string;
  targetUID: string;
  author: string;
  reason: string;
};

export type Post = {
  id: string;
  author: string;
  caption: string;
  date: string;
  time: string;
  feeling: string;
  image: string;
  year: string;
};

export type PostReport = {
  id: string;
  targetPostID: string;
  author: string;
  reason: string;
};
