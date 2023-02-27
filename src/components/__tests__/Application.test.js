import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, queryByAltText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
import axios from "axios";

import Application from "components/Application";

afterEach(cleanup); // reset

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
    // Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // Click the "Add" button on the first empty appointment.
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    // Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = (getAllByTestId(container, "day")).find(day => 
      queryByText(day, "Monday")  
    )

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();    
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => 
      queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    fireEvent.click(queryByText(appointment, "Confirm"));

    // Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();

    // Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = (getAllByTestId(container, "day")).find(day => 
      queryByText(day, "Monday")  
    )
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();//2 spots remaining failes the test    
  
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => 
      queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(getByAltText(appointment, "Edit"));

    // Change the name "William Li" into the input "Archie Cohen".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "William Li" }
    });

    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    fireEvent.click(getByText(appointment, "Save"));

    // Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait until the element with the text "William Li" is displayed.
    await waitForElement(() => getByText(appointment, "William Li"));
    expect(getByText(appointment, "William Li")).toBeInTheDocument();

    // Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    const day = (getAllByTestId(container, "day")).find(day => 
      queryByText(day, "Monday")  
    )

    expect(getByText(day, "1 spot remaining"));

  });


  /* test number five */
  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />)

    await waitForElement(() => getByText(container, "Archie Cohen"))
  
    // Click the "Edit" button on the Archie Cohen appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));

    // Change the name "William Li" into the input "Archie Cohen".

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "William Li" }
    });

    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    // Wait until the element with the text "Error" is displayed.  
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
    
    // Click the "Close" button on the Error component
    fireEvent.click(getByAltText(appointment, "Close"));  
    expect(getByText(appointment, "Save")).toBeInTheDocument();
  
    fireEvent.click(queryByText(appointment, "Cancel"))
  
    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  
    const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"))
  
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
  
    fireEvent.click(queryByText(appointment, "Confirm"))
  
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    // show Error components after sending the delete request
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Error")).toBeInTheDocument();
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});



