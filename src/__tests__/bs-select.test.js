import React from "react";
import {screen, render, fireEvent} from "@testing-library/react";

const BSOption = require("../bs-option").default;
const BSSelect = require("../bs-select").default;

describe("BSSelect", () => {
  it("should be rendered sucessful", () => {
    render(<BSSelect dataTestId={"bs-select"}></BSSelect>);
    const select = screen.getByTestId("bs-select");
    expect(select).toBeInTheDocument();
    expect(select.className).toBe("dropdown bs-select");
    const ddToggle = select.getElementsByClassName("dropdown-toggle")[0];
    expect(ddToggle).not.toBeUndefined();
    expect(ddToggle).toBeInTheDocument();
    expect(ddToggle.className).toBe(
      "form-control dropdown-toggle d-flex align-items-center",
    );
    expect(ddToggle.getAttribute("data-bs-toggle")).toBe("dropdown");
    expect(ddToggle.getAttribute("tabindex")).toBe("0");
    const input = ddToggle.getElementsByTagName("input")[0];
    expect(input).not.toBeUndefined();
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("hidden");
    const formatedValue = ddToggle.getElementsByTagName("div")[0];
    expect(formatedValue).not.toBeUndefined();
    expect(formatedValue).toBeInTheDocument();
    expect(formatedValue.textContent).toBe(" ");
    expect(formatedValue.className).toBe("flex-grow-1 text-muted");
    const dropdownMenu = select.getElementsByTagName("ul")[0];
    expect(dropdownMenu).not.toBeUndefined();
    expect(dropdownMenu).toBeInTheDocument();
    expect(dropdownMenu.className).toBe("dropdown-menu");
  });

  it("should be rendered with option", () => {
    render(
      <BSSelect dataTestId="select">
        <BSOption dataTestId="option1">Option 1</BSOption>
      </BSSelect>,
    );
    const option = screen.getByTestId("option1");
    expect(option).toBeInTheDocument();
    expect(option.textContent).toBe("Option 1");
    const select = screen.getByTestId("select");
    const formatedValue = select.querySelector(".dropdown-toggle div");
    expect(formatedValue?.textContent).toBe("Option 1");
  });
  it("should be rendered with few options", () => {
    render(
      <BSSelect dataTestId="select">
        <BSOption>Select</BSOption>
        <BSOption value="option1">Option 1</BSOption>
        <BSOption value="option2">Option 2</BSOption>
      </BSSelect>,
    );
    const select = screen.getByTestId("select");
    const formatedValue = select.querySelector(".dropdown-toggle div");
    expect(formatedValue).not.toBeNull();
    expect(formatedValue?.textContent).toBe("Select");
    expect(formatedValue?.className).toBe("flex-grow-1 text-muted");
    expect(screen.getByText("Option 1"));
    expect(screen.getByText("Option 2"));
  });
  it("should update value by click on option", () => {
    render(
      <BSSelect dataTestId="select">
        <BSOption dataTestId="option0" disabled>Select</BSOption>
        <BSOption dataTestId="option1" value="option1">Option 1</BSOption>
        <BSOption dataTestId="option2" value="option2">Option 2</BSOption>
      </BSSelect>,
    );
    const select = screen.getByTestId("select");

  });
});
