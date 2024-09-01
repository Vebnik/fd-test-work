<script setup lang="ts">
import { ref } from 'vue'
import { VaButton } from 'vuestic-ui';
import { Currency } from './interfaces/currency';
import { useAppStore } from './store/app.store';

import ConvertView from './views/ConvertView.vue';
import HomeView from './views/HomeView.vue';

const currencys: Currency[] = [
  {
    title: 'USD',
    symbol: '$',
  },
  {
    title: 'RUB',
    symbol: '₽',
  },
  {
    title: 'EUR',
    symbol: '€',
  }
]

const appStore = useAppStore()
const page = ref(1)

</script>

<template>
  <VaLayout style="height: 100vh">
    <template #top>
      <VaNavbar color="primary" class="py-2">
        <template #left>
          <VaButton @click="page = 1" style="width: 100px">General</VaButton>
          <VaButton @click="page = 2" style="width: 100px">Convert</VaButton>
        </template>
        <template #center>
          <VaNavbarItem class="font-bold text-lg">
            Currency converter
          </VaNavbarItem>
        </template>
        <template #right>
          <VaDropdown>
            <template #anchor>
              <VaButton> Currency </VaButton>
            </template>
        
            <VaDropdownContent class="flex flex-col gap-2">
              <VaButton color="secondary" v-for="item in currencys" @click="appStore.generalCurrency = item">
                <div class="mx-2">
                  {{ item.title }}
                </div>
                <VaBadge
                  :text="item.symbol"
                  color="#B3D943"
                  class="mr-2"
                />
              </VaButton>
            </VaDropdownContent>
          </VaDropdown>
          <VaButton color="warning" class="ml-4">
            {{ appStore.generalCurrency.title }}
            {{ appStore.generalCurrency.symbol }}
          </VaButton>
        </template>
      </VaNavbar>
    </template>

    <template #content>
      <main v-if="page === 1" class="p-4">
        <h3 class="va-h3">
          <HomeView />
        </h3>
      </main>
      <main v-else-if="page === 2" class="p-4">
        <h3 class="va-h3">
          <ConvertView />
        </h3>
      </main>
    </template>
  </VaLayout>
</template>