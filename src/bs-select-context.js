import React from "react";
/**
 * @type {{onSelect: Function | null, currentValue: string | null}}
 */
const defaultContextValue  = {
  onSelect: null,
  currentValue: null
}
const BSSelectContext = React.createContext(defaultContextValue);
export default BSSelectContext;

