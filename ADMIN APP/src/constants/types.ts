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
