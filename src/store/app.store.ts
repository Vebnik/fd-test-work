import { defineStore } from "pinia";
import { Currency } from "../interfaces/currency";

interface State {
  generalCurrency: Currency;
}

export const useAppStore = defineStore("app", {
  state: (): State => ({
    generalCurrency: {
      title: "USD",
      symbol: "$",
    },
  }),
  getters: {},
  actions: {
    setGeneralCurrency: async (currency: Currency) => {
      // @ts-ignore
      this.generalCurrency = currency;
    },
  },
});
