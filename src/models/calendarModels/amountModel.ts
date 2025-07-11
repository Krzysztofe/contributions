import { URL_AMOUNT_GLOBAL } from "../../config/apiUrl";
import { HelpersHttp } from "../../helpers/helpersHttp";

export class AmountModel {
  static amount = "";

  static GETAmountOptions = {
    url: URL_AMOUNT_GLOBAL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  static async getAmount() {
    const amountDatabase = await HelpersHttp.fetchData(this.GETAmountOptions);
    this.amount = amountDatabase?.amount;
  }
}
