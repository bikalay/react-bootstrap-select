import React from "react";
import PropTypes from "prop-types";
import BSOption from "./bs-option";

import BSSelect from "./bs-select";

export default {
  title: "Example/BSOption",
  component: BSSelect,
  argTypes: {placeholder: PropTypes.string},
};

const Template1 = (args) => (
  <BSSelect {...args}>
    <BSOption value="1">Option 1</BSOption>
    <BSOption value="2">Option 2</BSOption>
  </BSSelect>
);

export const Default = Template1.bind({});

const Template2 = (args) => (
  <BSSelect {...args}>
    <BSOption disabled value="">
      Select...
    </BSOption>
    <BSOption value="1">Option 1</BSOption>
    <BSOption value="2">Option 2</BSOption>
    <BSOption value="3">Option 3</BSOption>
  </BSSelect>
);
export const WithPlaceholder = Template2.bind({});

const Template3 = (args) => (
  <BSSelect {...args}>
    <BSOption value="">Select...</BSOption>
    <BSOption value="bold">
      <b>Bold</b>
    </BSOption>
    <BSOption value="italic">
      <i>Italic</i>
    </BSOption>
    <BSOption value="small">
      <small>Small</small>
    </BSOption>
    <BSOption value="list">
      <ul>
        <li>List Item 1</li>
        <li>List Item 2</li>
      </ul>
    </BSOption>
    <BSOption value="link">
      <span>Click</span>&nbsp;
      <a href="#">Link</a>
      </BSOption>
  </BSSelect>
);

export const WithOptionsFormating = Template3.bind({});
