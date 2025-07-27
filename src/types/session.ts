export type User = {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: Date;
  location?: string;
  title?: string;
  image?: string;
  linkedInId?: string;
  industryId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  user: User;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
};
