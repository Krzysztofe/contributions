import { URL_AMOUNT_GLOBAL } from "../../config/apiUrl";
import { Helpers } from "../../helpers/helpers";

export class amountModel {
  static amount = "";

  static GETAmountOptions = {
    url: URL_AMOUNT_GLOBAL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  };

  static async getAmount() {
    const amountDatabase = await Helpers.fetchData(this.GETAmountOptions);
    this.amount = amountDatabase?.amount;
  }
}
