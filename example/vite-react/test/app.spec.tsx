import { App } from "../src/App";
import { render } from "vitest-browser-react";
import { expect, test } from 'vitest'

test('使用test', async () => {
  const { getByRole, getByTestId } = render(<App />, {
  })

  await getByRole("textbox", { name: "num1" }).fill("2");
  await expect.element(getByTestId("result")).toHaveTextContent(/^2$/);
  await getByRole("textbox", { name: "num2" }).fill("4");
  await expect.element(getByTestId("result")).toHaveTextContent(/^6$/);
  await getByRole("textbox", { name: "num1" }).fill("a");
  await expect.element(getByTestId("result")).toHaveTextContent(/^NaN$/);
  await getByRole("textbox", { name: "num1" }).fill("4");
  await expect.element(getByTestId("result")).toHaveTextContent(/^8$/);
});
