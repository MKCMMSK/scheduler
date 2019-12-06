import React from "react";
import axios from "axios";


import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, getByTestId, queryByTestId,getByDisplayValue} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const {getByText} = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

describe ("Application", () => {
  it("loads data, books an interview and reduces the spots remaining for the first day by 1" , async () => {

    const { container, debug} = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
    expect(getByPlaceholderText(appointment, /Enter student name/i));

    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    expect(getByDisplayValue(appointment, /Lydia Miller-Jones/i));
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    expect(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones" ));
    
    const day = getAllByTestId(container, "day")
    .find(days =>
        getByText(days, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();


  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you want to cancel the interview?"))
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  });
  
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you want to cancel the interview?"))
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    const day = getAllByTestId(container, "day")
    .find(days =>
        getByText(days, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByPlaceholderText(appointment, /Enter student name/i));

    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
      target: { value: "Colin" }
    });
    expect(getByDisplayValue(appointment, /Colin/i));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    const day = getAllByTestId(container, "day")
    .find(days =>
        getByText(days, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  })

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("shows the save error when failing to save an appointment", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Edit"));
    expect(getByPlaceholderText(appointment, /Enter student name/i));

    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
      target: { value: "Colin" }
    });
    expect(getByDisplayValue(appointment, /Colin/i));
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Error saving the appointment")
    );
    expect(getByText(appointment, "Error saving the appointment")).toBeInTheDocument();
  })

  it("shows the delete error when failing to save an appointment", () => {
    axios.delete.mockRejectedValueOnce();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[1];
    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you want to cancel the interview?"));
    fireEvent.click(getByText(appointment, "Confirm"));
    
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Error deleting the appointment")
    );
    expect(getByText(appointment, "Error deleting the appointment")).toBeInTheDocument();
  })
})

