import App from "../src/App.vue";
import { render } from 'vitest-browser-vue'
import { expect, test } from 'vitest'

test('renders name and the counter', async () => {
  const { getByRole, getByTestId } = render(App, {
  })

  await getByRole("textbox", { name: "num1" }).fill("2");
  await expect.element(getByTestId("result")).toHaveTextContent(/^2$/);
  await getByRole("textbox", { name: "num2" }).fill("4");
  await expect.element(getByTestId("result")).toHaveTextContent(/^6$/);
  await getByRole("textbox", { name: "num1" }).fill("a");
  await expect.element(getByTestId("result")).toHaveTextContent(/^NaN$/);
  await getByRole("textbox", { name: "num1" }).fill("4");
  await expect.element(getByTestId("result")).toHaveTextContent(/^8$/);
})
