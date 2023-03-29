import { render, screen, fireEvent } from "@testing-library/react";
import MembersInfoEdit from "../pages/users/MembersInfoEdit";
import React from "react";
import '@testing-library/jest-dom';

//テストコードが読み込まれているかの確認で使用
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

//送信ボタンがあるかどうか
test('renders Button ', () => {
  const { getByTestId } =render(<MembersInfoEdit />);
  const submitButton = getByTestId('submit-button');
  expect(submitButton).toBeInTheDocument();
});

