import { URL_AMOUNT_GLOBAL } from "../data/dataUrl";
import { Helpers } from "../utils/helpers";

export class StateAmount {
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
