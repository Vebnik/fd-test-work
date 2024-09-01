<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useCurrencyStore } from '../store/currency.store';
import { ComapareCurrency } from '../interfaces/currency';
import { useToast } from 'vuestic-ui';
import { useAppStore } from '../store/app.store';

const options = [
  "USD",
  "RUB",
  "EUR",
  "BRL",
  "KZT",
  "IDR"
]

const currencyStore = useCurrencyStore();
const appStore = useAppStore()

const toast = useToast()

const currencys = ref<ComapareCurrency | undefined>()
const sourceValue = ref<number>(0)
const sourceCurrency = ref<string>(options.filter(el => el.includes(appStore.generalCurrency.title))[0]);

const targetValue = ref<number>(0)
const targetCurrency = ref<string>(options[0]);

const getRate = (target: string, source: string) => {

  if (target.includes(source)) return 1

  for (const key in currencys.value) {
    const targetKey = key.split('-')[0].toUpperCase()
    const sourceKey = key.split('-')[1].toUpperCase()

    if (targetKey.includes(target) && sourceKey.includes(source)) {
      // @ts-ignore
      return currencys.value[key]
    }
  }
}

watch(sourceValue, () => {
  const rate = getRate(targetCurrency.value, sourceCurrency.value)

  if (rate)
    targetValue.value = +(sourceValue.value/rate).toFixed(2)
})

watch(sourceCurrency, () => {
  const rate = getRate(targetCurrency.value, sourceCurrency.value)

  if (rate)
    targetValue.value = +(sourceValue.value/rate).toFixed(2)
})

watch(targetCurrency, () => {
  const rate = getRate(targetCurrency.value, sourceCurrency.value)

  if (rate)
    targetValue.value = +(sourceValue.value/rate).toFixed(2)
})

onMounted(async () => {
  currencyStore.getCurrencyes()
    .then(data => currencys.value = data)
    .catch((err) => {
      toast.notify({ title: "Error", message: err, color: 'warning' })
    });
})

</script>

<template>
  <div class="h-[100%] flex flex-col justify-center items-center">
    <div class="flex flex-col gap-4 max-w-[800px] justify-center">
      Source
      <div class="flex bg-slate-300 p-4 rounded">
        <VaInput v-model="sourceValue" placeholder="Placeholder" type="number" />
        |
        <VaSelect v-model="sourceCurrency" :options="options" placeholder="Select an currency" />
      </div>

      Target
      <div class="flex bg-slate-300 p-4 rounded">
        <VaInput disabled v-model="targetValue" placeholder="Placeholder" type="number" />
        |
        <VaSelect v-model="targetCurrency" :options="options" placeholder="Select an currency" />
      </div>
    </div>

  </div>
</template>

<style lang="css"></style>
