<template>
  <div>
      <v-btn :loading="busy" @click="callWorker">Call Worker</v-btn>
      <div v-for="(val, index) in countingMsg" :key="index">{{ val }}</div>
  </div>
</template>
<script setup lang="ts">
// import worker script according to the doc of Vite
// @ts-ignore
import MyWorker from '@/assets/workerVite?worker'
const numToSum = ref(1000000000)
const countingMsg = ref<string[]>([])
const busy = ref(false)

async function callWorker() {
  busy.value = true
  const result = await new Promise<number>((resolve) => {
      const worker = new MyWorker()
      worker.addEventListener('message', (e: any) => {
          if (e.data) {
              resolve(e.data)
              worker.terminate()
          }
      }, false);
      worker.postMessage(numToSum.value);
  })
  countingMsg.value.push(`The sum of 1 to ${numToSum.value} is ${result}.`)
  busy.value = false
}
</script>