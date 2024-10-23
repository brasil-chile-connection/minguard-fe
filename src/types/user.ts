export type User = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  role: string;
};

export type UserResponse = {
  id: 0;
  email: string;
  firstName: string;
  lastName: string;
  mobilePrefix: string;
  mobileNumber: string;
  createdAt: Date;
  updatedAt: Date;
  acceptTc: boolean;
  gender: {
    id: number;
    name: string;
  };
  role: {
    id: 0;
    name: string;
  };
  profilePicturePath: string;
};
