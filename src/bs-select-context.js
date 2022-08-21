import {applyStyles} from "@popperjs/core";
import React from "react";
/**
 * @type {{onSelect?: Function | null, selectedValue?: string | null, applyedValue?: string | null}}
 */
const defaultContextValue = {
  onSelect: null,
  selectedValue: null,
  applyedValue: null,
};

const BSSelectContext = React.createContext(defaultContextValue);

export default BSSelectContext;
