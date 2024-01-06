export interface UserListDto {
  id: string;
  username: string;
  email: string;
  role: string;
  name: string;
  surname: string;
}

export interface UserDetailDto extends UserListDto {
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  isActive: string;
  about: string;
}
