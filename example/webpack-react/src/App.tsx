import { FC, useEffect, useRef, useState } from "react";
import React from "react";
import { WorkerClient as Worker } from "t-worker";
import type { DemoMethods } from "./worker/demo/type";

import "./app.css";

export const App: FC = () => {
  const [num1, setNum1] = useState("0");
  const [num2, setNum2] = useState("0");
  const [res, setRes] = useState(0);

  const worker = useRef<Worker<DemoMethods>>();

  useEffect(() => {
    var obj = {pool: 4};
    const instance = new Worker<DemoMethods>(new URL("./worker/demo/index", import.meta.url), obj);
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
          <div>{res}</div>
        </div>
      </form>
    </div>
  );
};

