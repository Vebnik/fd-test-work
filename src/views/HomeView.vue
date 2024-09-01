<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import { useCurrencyStore } from '../store/currency.store';
import { ComapareCurrency } from '../interfaces/currency';
import { useToast } from 'vuestic-ui';
import { useAppStore } from '../store/app.store';

const options = [
  "USD",
  "RUB",
  "EUR",
]

const currencyStore = useCurrencyStore();
const appStore = useAppStore()

const toast = useToast()

const currencys = ref<ComapareCurrency | undefined>()

const sourceValue = ref<number>(0)
const sourceCurrency = computed(() => options.filter(el => !(el === appStore.generalCurrency.title))[0]);

const targetValue = ref<number>(0)
const targetCurrency = computed(() => options.filter(el => !(el === appStore.generalCurrency.title))[1]);

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

watch(sourceCurrency, () => {
  const sourceRate = getRate(appStore.generalCurrency.title, sourceCurrency.value)
      const targetRate = getRate(appStore.generalCurrency.title, targetCurrency.value)

      if (targetRate)
        targetValue.value = targetRate
      
      if (sourceRate)
        sourceValue.value = sourceRate
})

watch(targetCurrency, () => {
  const sourceRate = getRate(appStore.generalCurrency.title, sourceCurrency.value)
      const targetRate = getRate(appStore.generalCurrency.title, targetCurrency.value)

      if (targetRate)
        targetValue.value = targetRate
      
      if (sourceRate)
        sourceValue.value = sourceRate
})

onMounted(async () => {
  currencyStore.getCurrencyes()
    .then(data => {
      currencys.value = data

      const sourceRate = getRate(appStore.generalCurrency.title, sourceCurrency.value)
      const targetRate = getRate(appStore.generalCurrency.title, targetCurrency.value)

      if (targetRate)
        targetValue.value = targetRate
      
      if (sourceRate)
        sourceValue.value = sourceRate
    })
    .catch((err) => {
      toast.notify({ title: "Error", message: err, color: 'warning' })
    });
})

</script>

<template>
  <div class="h-[100%] flex flex-col justify-center items-center">
    <div class="flex flex-col gap-4 max-w-[800px] justify-center">
      <div class="flex bg-slate-300 p-4 rounded">
        <VaInput disabled v-model="sourceValue" placeholder="Placeholder" type="number" />
        |
        <VaSelect disabled v-model="sourceCurrency" :options="options" placeholder="Select an currency" />
      </div>

      <div class="flex bg-slate-300 p-4 rounded">
        <VaInput disabled v-model="targetValue" placeholder="Placeholder" type="number" />
        |
        <VaSelect disabled v-model="targetCurrency" :options="options" placeholder="Select an currency" />
      </div>
    </div>

  </div>
</template>

<style lang="css"></style>
