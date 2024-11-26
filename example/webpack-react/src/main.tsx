import { App } from "./App";
import { render } from "react-dom";
import React from "react";
import "./app.css";

const IS_DEV = process.env.NODE_ENV === "development";
const container = document.querySelector("#root")!;

if (IS_DEV) {
  import("react-hot-loader/root").then(({ hot }) => {
    const HotApp = hot(App);
    render(<HotApp />, container);
  });
} else {
  render(<App />, container);
}
