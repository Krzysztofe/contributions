import { TypeObjectString } from "./typeObjectString";

export type TypeRequestOptions = {
  url: string;
  method?: string;
  headers: TypeObjectString;
  body?: TypeObjectString;
  sendEmails?: string;
};
