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
    <BSOption disabled value="">Select...</BSOption>
    <BSOption value="1">Option 1</BSOption>
    <BSOption value="2">Option 2</BSOption>
    <BSOption value="3">Option 3</BSOption>
  </BSSelect>
);

export const WithPlaceholder = Template2.bind({});

