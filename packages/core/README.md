# T-WORKER

t-worker是一个使用ts编写的，在 `vite` 或 `webpack` 中高效的使用 `web worker` 的工具

## 安装
```sh
// npm
$ npm i t-worker --save

// yarn
$ yarn add t-worker

// pnpm
$ pnpm add t-worker
```

## 快速上手
```Typescript
// type.ts
import type { AwaitAble } from "t-worker"

export type DemoMethods = ServerMethods<{
  add: (num1: number, num2: number) => AwaitAble<number>;
}>
```

```Typescript
// worker.ts
import type { DemoMethods } from "./type.ts";
import { WorkerServices } from "t-worker";


const sleep = (time = 1000) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, time);
  });

export default new WorkerServices<DemoMethods>({
  async add(val1, val2) {
    // 延迟示例
    await sleep(16);
    const val = Number(val1) + Number(val2);
    return res;
  },
});
```

```Typescript
//demo.ts use in vite
import { onScopeDispose } from "vue";
import demoWorkerUrl from "./worker?worker&url"
import { DemoMethods } from "./type"
import { WorkerClient } from "t-worker";

export useDemoWorker = () => {
  const worker = new WorkerClient<DemoMethods>(demoWorkerUrl, {
    type: "module",
  });

  const test = () => {
    worker.callRemote("add", [1, 2]).then(val => {
      console.log(val) // will be output 3;
    })
  }

  onScopeDispose(() => {
    worker.dispose();
  });
  
  return {
    worker,
    test
  }
}
```

```Typescript
//demo.ts use in webpack
import { onScopeDispose } from "vue";
import demoWorkerUrl from "./worker?worker&url"
import { DemoMethods } from "./type"
import { Worker } from "t-worker";

export useDemoWorker = () => {
  const opt = {
    name: "demo-worker"
  };
  // 必须使用 webpack 提供的黑魔法
  const worker = new Worker<DemoMethods>(new URL('./worker', import.meta.url), opt);

  const test = () => {
    worker.callRemote("add", [1, 2]).then(val => {
      console.log(val) // will be output 3;
    })
  }

  onScopeDispose(() => {
    worker.dispose();
  });
  
  return {
    worker,
    test,
  }
}
```