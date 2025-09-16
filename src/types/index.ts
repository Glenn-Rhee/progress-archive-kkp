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
}
