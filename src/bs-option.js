import React, {useContext} from "react";
import BSSelectContext from "./bs-select-context";

/**
 * @typedef {Object} BSOptionProps
 * @property {string=} value
 * @property {boolean=} disabled
 * @property {React.ReactNode=} children
 * @property {(value:string)=>string=} formatSelectedText
 */

/**
 * BSOption.
 *
 * @param {BSOptionProps} props
 */
const BSOption = (props) => {
  const {value, children, formatSelectedText, disabled} = props;
  const {onSelect, selectedValue, applyedValue} = useContext(BSSelectContext);
  const classes = ["dropdown-item"];
  if (selectedValue === value) {
    classes.push("active");
  } else if (disabled) {
    classes.push("text-muted");
  }
  return (
    <li
      className={classes.join(" ")}
      onClick={() => {
        if (onSelect && !disabled) {
          onSelect(value, children, formatSelectedText);
        }
      }}
    >
      {children}
    </li>
  );
};

export default BSOption;
