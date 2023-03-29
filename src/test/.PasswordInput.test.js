import React from "react";
import PasswordInput from "../components/form/PasswordInput";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("PasswordInput", () => {
  it("renders label element", () => {
    render(<PasswordInput />);
    const labelElement = screen.getByLabelText("password");
    expect(labelElement).toBeInTheDocument();
  });
});

//パスワードが入力できるかどうかのテスト
describe('PasswordInput', () => {
  it('allows input of an password ', () => {
    const setPassword = jest.fn();
    render(<PasswordInput password="" setPassword={setPassword} />);
    const passInput = screen.getByLabelText('password');
    fireEvent.change(passInput, { target: { value: 'aaaaaaaa' } });
    expect(setPassword).toHaveBeenCalledWith('aaaaaaaa');
  });
});
