export interface ResponsePayload<T = unknown> {
  status: "success" | "failed";
  message: string;
  statusCode: number;
  data?: T;
}

export interface Link {
  title: string;
  url: string;
  description?: string;
  isPrivate: boolean;
}

export interface DataLink extends Link {
  id: string;
  created_at: string;
}

export interface User {
  username: string;
  password: string;
}

export interface CreateUser {
  username: string;
  password: string;
  title: string;
  descriptionUser: string;
}

export interface DataUser extends CreateUser {
  id: string;
  created_at: string;
}

export interface DataPutUser {
  title: string;
  descriptionUser: string;
}
