import { render, screen, fireEvent } from "@testing-library/react";
import MembersInfoEdit from "../pages/users/MembersInfoEdit";
import React from "react";
import '@testing-library/jest-dom';

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('renders Button ', () => {
  const { getByTestId } =render(<MembersInfoEdit />);
  const submitButton = getByTestId('submit-button');
  expect(submitButton).toBeInTheDocument();
});

// test("form input values are saved in state", () => {
//   render(<Login />);
//   const emailInput = screen.getByLabelText("メールアドレス");
//   const passwordInput = screen.getByLabelText("パスワード");
//   fireEvent.change(emailInput, { target: { value: "test@test.com" } });
//   fireEvent.change(passwordInput, { target: { value: "aaaaaaaa" } });
//   expect(emailInput.value).toBe("test@test.com");
//   expect(passwordInput.value).toBe("aaaaaaaaa");
// });

// test("login is successful and cookie is set if email and password match", async () => {
//   const mockUser = [{ email: "test@test.com", password: "aaaaaaaa", id: 1 }];
//   jest.spyOn(global, "fetch").mockImplementation(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(mockUser),
//     })
//   );

//   render(<Login />);
//   const emailInput = screen.getByLabelText("メールアドレス");
//   const passwordInput = screen.getByLabelText("パスワード");
//   fireEvent.change(emailInput, { target: { value: "test@test.com" } });
//   fireEvent.change(passwordInput, { target: { value: "aaaaaaaa" } });
//   fireEvent.click(screen.getByText("ログイン"));

//   // cookieが設定されていることを確認する
//   expect(document.cookie).toContain("data");

//   global.fetch.mockRestore();
// });

// test("error message is displayed if email or password do not match", async () => {
//   const mockUser = [{ email: "test@test.com", password: "aaaaaaaa", id: 1 }];
//   global.fetch = jest.fn().mockImplementation(() =>
//   Promise.resolve({
//     json: () => Promise.resolve(mockUser),
//   })
// );

//   render(<Login />);
//   const emailInput = screen.getByLabelText("Email");
//   const passwordInput = screen.getByLabelText("Password");
//   fireEvent.change(emailInput, { target: { value: "test@test.com" } });
//   fireEvent.change(passwordInput, { target: { value: "aaaaaaaaa" } });
//   fireEvent.click(screen.getByText("ログイン"));

//   // エラーメッセージが表示されていることを確認する
//   expect(screen.getByText("＊入力内容を確認してください＊")).toBeInTheDocument();

//   global.fetch.mockRestore();
// });
