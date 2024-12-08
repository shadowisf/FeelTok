type User = {
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
};

type UserReport = {
  reportID: string;
  targetUID: string;
  author: string;
  reason: string;
};

type Post = {
  id: string;
  author: string;
  caption: string;
  createdAt: string;
  feeling: string;
  image: string;
};

type PostReport = {
  id: string;
  targetPostID: string;
  author: string;
  reason: string;
};
