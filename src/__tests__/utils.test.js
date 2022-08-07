import React from "react";
import {getNodeText} from "../utils";
describe("Utils", () => {
  it("should return same string for string", () => {
    expect(getNodeText("test string")).toBe("test string");
  })
  it("should return text from dom element", () => {
    expect(getNodeText(<div>test string</div>)).toBe("test string");
  })
  it("should return joined text from few html elemets", () => {
    expect(getNodeText(<div><span>test</span><i>string</i></div>)).toBe("teststring");
  })
});
