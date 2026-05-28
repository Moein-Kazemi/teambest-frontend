export interface IUser {
  _id: string;
  name: string;
  family: string;
  jobTitle: string;
  phone: string;
  email?: string;
  password: string;
  passwordConfirm: string;
  passwordChangedAt?: Date;
  role: "user" | "member" | "manager";
  teamId: string;
  avatar: string;
}
