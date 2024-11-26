import { ServerMethods } from "t-worker";


export type DemoMethods = ServerMethods<{
  add(num1: number, num2: number): number
}>
