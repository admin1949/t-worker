<script lang="ts" setup>
import { onScopeDispose, ref, watchEffect } from "vue";
import demoWorkerUrl from "@/worker/demo/index?worker&url"
import { DemoMethods } from "@/worker/demo/type"
import { WorkerClient } from "t-worker";

const worker = new WorkerClient<DemoMethods>(demoWorkerUrl, {
  type: "module",
});

const num1 = ref(0);
const num2 = ref(0);
const res = ref(0);

watchEffect(() => {
  worker.callRemote("add", [num1.value, num2.value]).then(val => {
    res.value = val;
  })
});

onScopeDispose(() => {
  worker.dispose();
})
</script>

<template>
  <div class="main-content">
    <form>
      <label>
        <div>num1</div>
        <input v-model="num1" />
      </label>
      
      <label>
        <div>num2</div>
        <input v-model="num2" />
      </label>
      
      <div class="res">
        <div class="label">res is: </div>
        <div data-testid="result"> {{ res }}</div>
      </div>
    </form>
  </div>
</template>

<style>
html, body {
  padding: 0;
  margin: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-content {
  padding: 12px;
  border-radius: 4px;
  background-color: aquamarine;
  font-size: 16px;
}
.main-content label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  height: 40px;
  width: 360px;
}
.main-content label input {
  height: 32px;
  width: 300px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 2px solid;
  font-size: 16px;
}
.main-content .res{
  width: 100%;
  display: flex;
  align-items: center;
  height: 32px;
  color: red;
}
.main-content .res .label {
  width: 60px;
  color: #000;
}
</style>