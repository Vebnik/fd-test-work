import { defineStore } from "pinia";
import { ComapareCurrency } from "../interfaces/currency";

interface State {
  currencys: ComapareCurrency | null;
}

export const useCurrencyStore = defineStore("currency", {
  state: (): State => ({ currencys: null }),
  getters: {},
  actions: {
    getCurrencyes: async (): Promise<ComapareCurrency> => {
      const response = await fetch(
        "https://status.neuralgeneration.com/api/currency"
      );

      if (response.ok)
        return response.json();

      throw "Error on get currency data"
    },
  },
});
