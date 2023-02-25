/*
  We are rendering `<Appointment />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment/index";
import Confirm from "components/Appointment/Confirm";
import Empty from "components/Appointment/Empty";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";

/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("renders Confirm component without crashing", () => {
    render(<Confirm />);
  });

  it("renders Empty component without crashing", () => {
    render(<Empty />);
  });

  it("renders Error component without crashing", () => {
    render(<Error />);
  });

  it("renders Form component without crashing", () => {
    render(<Form />);
  });

  it("renders Header component without crashing", () => {
    render(<Header />);
  });

  it("renders Show component without crashing", () => {
    render(<Show />);
  });

  it("renders Status component without crashing", () => {
    render(<Status />);
  });
});