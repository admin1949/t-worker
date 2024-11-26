import { DemoMethods } from "./type";
import { WorkerServices } from "t-worker";


export default new WorkerServices<DemoMethods>({
  "add"(num1, num2) {
    return Number(num1) + Number(num2);
  }
})