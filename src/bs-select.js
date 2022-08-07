import React, {useState, useCallback} from "react";
import BSSelectContext from "./bs-select-context";

/**
 * @typedef {Object} BSSelectProps
 * @property {string=} name
 * @property {string=} id
 * @property {string=} value
 * @property {boolean=} disabled
 * @property {string=} form
 * @property {boolean=} required
 * @property {number=} size
 * @property {boolean=} multiple
 * @property {JSX.Element[]=} children
 * @property {string=} placeholder
 * @property {number=} tabIndex
 */

/**
 * BSSelect.
 * @param {BSSelectProps} props
 */
const BSSelect = (props) => {
  const {children, value, tabIndex=0} = props;
  const selectedItem = children?.find((child) => {
    return !value || child.props.value === value;
  });
  const getOptionText = (node) => {
    if (typeof node === "string") {
      return node;
    }
    if (node && node.children) {
      return node.children
        .map((child) => {
          return getOptionText(child);
        })
        .join(" ")
        .trim();
    }
  };

  const currentValue = selectedItem ? selectedItem.props.value : "";

  let defaultPlaceholder = "";

  if (selectedItem && selectedItem.props && selectedItem.props.children) {
    const {value, formatSelectedText, children} = selectedItem.props;
    defaultPlaceholder = formatSelectedText
      ? formatSelectedText(value)
      : getOptionText(children);
  }
  const [selectedText, setSelectedText] = useState(defaultPlaceholder);
  const [selectedValue, setSelectedValue] = useState(currentValue);
  const onKeyPress = (event) => {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * onSelect.
   * @param {string} value
   */
  const onSelect = (value, node, formatSelectedText) => {
    setSelectedValue(value);
    if (formatSelectedText) {
      return setSelectedText(formatSelectedText(value));
    }
    return setSelectedText(getOptionText(node));
  };
  return (
    <BSSelectContext.Provider value={{onSelect, currentValue: selectedValue}}>
      <div className="dropdown bs-select" >
        <div
          tabIndex={tabIndex}
          data-bs-toggle="dropdown"
          className="form-control dropdown-toggle d-flex align-items-center"
          onKeyUp={onKeyPress}
        >
          <div className={`flex-grow-1 ${selectedValue ? "" : "text-muted"}`}>
            {selectedText || <span>&nbsp;</span>}
          </div>
        </div>
        <ul className="dropdown-menu">{children}</ul>
      </div>
    </BSSelectContext.Provider>
  );
};

export default BSSelect;
