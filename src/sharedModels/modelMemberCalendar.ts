import { ModelMemberSettings } from "./moedelMemberSettings";
import { ModelMonth } from "./modelMonth";

export type ModelMemberCalendar = ModelMemberSettings & {
  january: ModelMonth;
  february: ModelMonth;
  march: ModelMonth;
  april: ModelMonth;
  may: ModelMonth;
  june: ModelMonth;
  july: ModelMonth;
  august: ModelMonth;
  september: ModelMonth;
  october: ModelMonth;
  november: ModelMonth;
  december: ModelMonth;
  sum?: number;
  payedContribs?:number;
  // sumTotalToPay?: number;
  yearsCotribs?: { client_id: number; year: number; year_sum: number }[];
};
