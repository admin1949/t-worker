import { FC, useEffect, useRef, useState } from "react";
import { WorkerClient } from "t-worker";
import demoWorkUrl from "./worker/demo/index?worker&url";
import { DemoMethods } from "./worker/demo/type";
import "./app.css";

export const App: FC = () => {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  const [res, setRes] = useState(0);
  
  const worker = useRef<WorkerClient<DemoMethods>>();
  
  useEffect(() => {
    const instance = new WorkerClient<DemoMethods>(demoWorkUrl, { type: "module" });
    worker.current = instance;
    return () => {
      instance.dispose();
    }
  }, []);
  useEffect(() => {
    worker.current
      ?.callRemote("add", [Number(num1), Number(num2)])
      .then((r) => {
        setRes(r);
      });
  }, [num1, num2]);
  
  return (
    <div className="main-content">
      <form>
        <label>
          <div>num1</div>
          <input value={num1} onChange={(e) => setNum1(e.target.value)} />
        </label>

        <label>
          <div>num2</div>
          <input value={num2} onChange={(e) => setNum2(e.target.value)} />
        </label>

        <div className="res">
          <div className="label">res is: </div>
          <div data-testid="result">{String(res)}</div>
        </div>
      </form>
    </div>
  );
};
