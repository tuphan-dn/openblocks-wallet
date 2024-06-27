interface Window {
  openblocks: any;
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

type EdgeResponse<T> = {
  data: T | null;
  error: { message: string } | null;
  status: number;
  statusText: string;
};

type SecretShare = {
  id: string;
  user_id: string;
  secret: string;
  created_at: string;
  updated_at: string;
};
