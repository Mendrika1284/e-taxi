export enum Role {
  CLIENT = "CLIENT",
  DRIVER = "CONDUCTEUR",
  ADMIN = "ADMIN",
}

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: Role; // Défaut : CLIENT
  phone?: string;
  profilePicture?: string;
}

export interface User extends CreateUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
