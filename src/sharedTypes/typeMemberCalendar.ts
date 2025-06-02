import { TypeMemberSettings } from "./typeMemberSettings";
import { TypeMonth } from "./typeMonth";

export type TypeMemberCalendar = TypeMemberSettings & {
  january: TypeMonth;
  february: TypeMonth;
  march: TypeMonth;
  april: TypeMonth;
  may: TypeMonth;
  june: TypeMonth;
  july: TypeMonth;
  august: TypeMonth;
  september: TypeMonth;
  october: TypeMonth;
  november: TypeMonth;
  december: TypeMonth;
  sum?: number;
  payedContribs?: number;
  yearsCotribs?: { client_id: number; year: number; year_sum: number }[];
};
