import Appointment from "components/Appointment/index";
import React from "react";
import { render } from "@testing-library/react";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});

