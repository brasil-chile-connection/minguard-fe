export type User = {
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
    id: number;
    name: string;
  };
  profilePicturePath: string;
};

export type UserForm = {
  email: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  mobilePrefix: string;
  mobileNumber: string;
  acceptTc: boolean;
  genderId: number;
};

export type UserEdit = {
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  mobilePrefix: string;
  mobileNumber: string;
  acceptTc: boolean;
  genderId: number;
};
