import React from "react";
import EmailInput from "../components/form/EmailInput";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("EmailInput", () => {
  it("renders label element", () => {
    render(<EmailInput />);
    const labelElement = screen.getByLabelText("email");
    expect(labelElement).toBeInTheDocument();
  });
});

//メールアドレスが入力できるかどうかのテスト
describe('EmailInput', () => {
  it('allows input of an email address', () => {
    const setEmail = jest.fn();
    render(<EmailInput email="" setEmail={setEmail} />);
    const emailInput = screen.getByLabelText('email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(setEmail).toHaveBeenCalledWith('test@example.com');
  });
});
