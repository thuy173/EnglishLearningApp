export default interface UserDetailInfoDto {
  fullName: string;
  avatar: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  createdAt: string;
  updatedAt: string;
}

export enum Gender {
  MALE = "Nam",
  FEMALE = "Nữ",
  OTHER = "Khác",
}
