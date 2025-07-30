export type APIResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type MetaDataResponse<T> = {
  page: number;
  count: number;
  total_data: number;
} & APIResponse<T>;

export type User = {
  id: string;
  name: string;
  email: string;
  img: string;
  level: number;
};
