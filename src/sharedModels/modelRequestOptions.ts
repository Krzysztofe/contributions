export type ModelRequestOptions = {
  url: string;
  method?: string;
  headers: { [key: string]: string };
  body?: { [key: string]: string | null };
};
