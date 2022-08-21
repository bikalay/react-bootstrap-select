import React, {useState, useCallback, useRef} from "react";
import {Dropdown} from "bootstrap";
import BSSelectContext from "./bs-select-context";

/**
 * @typedef {Object} BSSelectProps
 * @property {string=} name
 * @property {string=} id
 * @property {string=} value
 * @property {string=} defaultValue
 * @property {boolean=} disabled
 * @property {string=} form
 * @property {boolean=} required
 * @property {number=} size
 * @property {boolean=} multiple
 * @property {JSX.Element[] | JSX.Element=} children
 * @property {string=} placeholder
 * @property {number=} tabIndex
 * @property {string=} dataTestId
 */

/**
 * BSSelect.
 * @param {BSSelectProps} props
 */
const BSSelect = (props) => {
  const {value, tabIndex = 0, name, defaultValue, dataTestId} = props;
  /**
   * @type {JSX.Element[]}
   */
  let children;
  if (!props.children) {
    children = [];
  } else if (!Array.isArray(props.children)) {
    children = [props.children];
  } else {
    children = props.children;
  }

  children = Array.isArray(children) ? children : [children];

  const dropdown = useRef(null);
  const selectedItem = children.find((child) => {
    return !value || child.props.value === value;
  });
  /**
   * getOptionText.
   *
   * @param {JSX.Element} node
   */
  const getOptionText = (node) => {
    if (["string", "number"].includes(typeof node)) return node;
    if (node instanceof Array) return node.map(getOptionText).join("");
    if (typeof node === "object" && node)
      return getOptionText(node.props.children);
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
  const [applyedValue, setAppliedValue] = useState(currentValue);
  const onKeyPress = (event) => {
    const currentIndex = children.findIndex(
      (child) => child.props.value === selectedValue,
    );
    const dd = new Dropdown(dropdown.current);

    switch (event.key) {
      case "ArrowUp":
      case "k":
        if (currentIndex !== -1 && currentIndex > 0) {
          const selectedItem = children[currentIndex - 1];
          if (selectedItem) {
            setSelectedValue(selectedItem.props.value);
          }
        }
        break;

      case "ArrowDown":
      case "j":
        if (currentIndex !== -1 && currentIndex < children.length - 1) {
          const selectedItem = children[currentIndex + 1];
          if (selectedItem) {
            setSelectedValue(selectedItem.props.value);
          }
        }
        break;
      case "Enter":
        const selectedItem = children[currentIndex];
        setAppliedValue(selectedItem.props.value);
        if (selectedItem.props.formatSelectedText) {
          setSelectedText(selectedItem.props.formatSelectedText(value));
        } else {
          setSelectedText(getOptionText(selectedItem.props.children));
        }
        dd.hide();
        break;
      case "Escape":
        setSelectedValue(applyedValue);
        dd.hide();
        break;
      default:
        break;
    }
    event.preventDefault();
  };

  /**
   * onSelect.
   * @param {string} value
   */
  const onSelect = (value, node, formatSelectedText) => {
    setSelectedValue(value);
    setAppliedValue(value);
    if (formatSelectedText) {
      return setSelectedText(formatSelectedText(value));
    }
    return setSelectedText(getOptionText(node));
  };
  return (
    <BSSelectContext.Provider value={{onSelect, selectedValue, applyedValue}}>
      <div
        data-testid={dataTestId}
        className="dropdown bs-select"
        ref={dropdown}
      >
        <div
          tabIndex={tabIndex}
          data-bs-toggle="dropdown"
          className="form-control dropdown-toggle d-flex align-items-center"
          onKeyUp={onKeyPress}
        >
          <input
            type="hidden"
            name={name}
            defaultValue={defaultValue}
            value={applyedValue}
          />
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
