import React from "react";
import {screen, render, fireEvent} from "@testing-library/react";

const BSSelectContext = require("../bs-select-context").default;
const BSOption = require("../bs-option").default;

describe("bs-option", () => {
  it("should be rendered sucessful", () => {
    render(
      <BSSelectContext.Provider value={{}}>
        <BSOption dataTestId="option1" value="option1">
          Option 1
        </BSOption>
      </BSSelectContext.Provider>,
    );
    const element = screen.getByTestId("option1");
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("Option 1");
    expect(element.className).toBe("dropdown-item");
    fireEvent.click(element);
  });
  it("should be rendered sucessful with disabled state", () => {
    const onSelect = jest.fn();
    render(
      <BSSelectContext.Provider value={{onSelect}}>
        <BSOption dataTestId="option1" value="option1" disabled>
          Option 1
        </BSOption>
      </BSSelectContext.Provider>,
    );
    const element = screen.getByTestId("option1");
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("Option 1");
    expect(element.className).toBe("dropdown-item text-muted");
    fireEvent.click(element);
    expect(onSelect).not.toHaveBeenCalled();
  });
  it("should be rendered sucessful with selected state", () => {
    render(
      <BSSelectContext.Provider value={{selectedValue: "option1"}}>
        <BSOption dataTestId="option1" value="option1">
          Option 1
        </BSOption>
      </BSSelectContext.Provider>,
    );
    const element = screen.getByTestId("option1");
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe("Option 1");
    expect(element.className).toBe("dropdown-item active");
  });
  it("should call onSelect function by click", () => {
    const onSelect = jest.fn();
    render(
      <BSSelectContext.Provider value={{onSelect}}>
        <BSOption dataTestId="option1" value="option1">
          Option 1
        </BSOption>
      </BSSelectContext.Provider>,
    );
    const element = screen.getByTestId("option1");
    fireEvent.click(element);
    expect(onSelect).toHaveBeenCalledWith("option1", "Option 1", undefined);
  });
});
