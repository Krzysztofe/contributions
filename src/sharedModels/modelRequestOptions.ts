import { ModelObjectString } from "./modelObjectString";

export type ModelRequestOptions = {
  url: string;
  method?: string;
  headers: ModelObjectString;
  body?: ModelObjectString;
};
