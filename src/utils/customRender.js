import React from "react";
import { render } from "@testing-library/react-native";
export * from "@testing-library/react-native";

const customRender = (ui) => render(ui);

export { customRender as render };
