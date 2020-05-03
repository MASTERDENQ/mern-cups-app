import React from "react";
import ReactDOM from "react-dom";
import Login from "./../Logout";
import { isTSAanyKeyword } from "@babel/types";
import Logout from "./../Logout";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Logout />, div);
});

it("renders logout Nav Link correctly", () => {
  const { getByTestId } = render(<Logout label="Logout" />);
  expect(getByTestId("logout")).toHaveTextContent("Logout");
});

it("renders logout Nav Link correctly", () => {
  const { getByTestId } = render(<Logout label="save" />);
  expect(getByTestId("logout")).toHaveTextContent("save");
});

it("matches snapshot", () => {
  const tree = renderer.create(<Logout label="save" />).toJSON();
  expect(tree).toMatchSnapshot();
});
