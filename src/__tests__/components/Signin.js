import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { SignIn } from "../../components/SignIn";
import { MockedProvider } from "@apollo/client/testing";
// ...

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button

      const submitFormMock = jest.fn();
      const { getByPlaceholderText, getByA11yRole } = render(
        <MockedProvider mocks={[]} addTypename={false}>
          <SignIn onSubmit={submitFormMock} />
        </MockedProvider>
      );

      const usernameInput = getByPlaceholderText("Username");
      const passwordInput = getByPlaceholderText("Password");

      fireEvent.changeText(usernameInput, "Username");
      fireEvent.changeText(passwordInput, "Zuckerberg");
      fireEvent.press(getByA11yRole("button"));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(submitFormMock).toHaveBeenCalledTimes(1);
      });
      
      expect(submitFormMock.mock.calls[0][0]).toEqual({
        username: "Username",
        password: "Zuckerberg",
      });

    });
  });
});
