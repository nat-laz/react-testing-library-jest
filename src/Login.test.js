import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
 
    __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("button input should be rendered", () => {
  render(<Login />);
  const btnEl = screen.getByRole("button");
  expect(btnEl).toBeInTheDocument();
});

test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});

test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const btnEl = screen.getByRole("button");
  expect(btnEl).not.toHaveTextContent(/please wait/i);
});

test("loading should not be rendered", () => {
  render(<Login />);
  const btnEl = screen.getByRole("button");
  expect(btnEl).toBeDisabled();
});

test("error message should not be visible", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  expect(usernameInputEl.value).toBe(testValue);
});

test("password input should change", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  
  expect(passwordInputEl.value).toBe(testValue);
});

test("button should should not be disabled when inputs exists", () => {
  render(<Login />);
  const btnEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  
  expect(btnEl).not.toBeDisabled();
});

test("loading should be rendered when click", () => {
  render(<Login />);
  const btnEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(btnEl);

  expect(btnEl).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered when click after fetching", async () => {
  render(<Login />);
  const btnEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(usernameInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(btnEl);

  await waitFor(() => expect(btnEl).not.toHaveTextContent(/please wait/i));
});

test("user should be render after fetching", async () => {
    render(<Login />);
    const btnEl = screen.getByRole("button");
    const usernameInputEl = screen.getByPlaceholderText(/username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
  
    const testValue = "test";
  
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    fireEvent.click(btnEl);

    const userItem = await screen.findByText("John")
  
   expect(userItem).toBeInTheDocument();
  });
  