import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdditionalData } from "../store/Upload-slice";

export default function InputComponent({ defaultText, name, upperText, placeholder, limit }) {
  const [charactersNum, setCharacterNum] = useState(0);
  const [content, setContent] = useState("");
  const inputRef = useRef();
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const timeoutRef = useRef();

  useEffect(() => {
    inputRef.current.innerText = defaultText ? defaultText : "";
    setContent(defaultText ? defaultText : "");
    setCharacterNum(defaultText ? defaultText.length : 0);
    dispatch(updateAdditionalData({ [`${name}`]: defaultText }));
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [defaultText]);

  const handleChange = (event) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const input = event.target.innerText;
      if (input.length > limit) {
        // Prevent adding more characters
        const limitedContent = input.slice(0, limit);
        event.target.innerText = limitedContent;
        dispatch(updateAdditionalData({ [`${name}`]: limitedContent }));

        // Place the caret at the end
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(event.target.childNodes[0], limit);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      } else {
        // Update the state with the new number of characters
        setCharacterNum(input.length);
        setContent(input);
        dispatch(updateAdditionalData({ [`${name}`]: input }));
      }
    }, 200);
  };

  const focused = () => {
    wrapperRef.current.classList.add("focused");
  };
  const blurred = () => {
    wrapperRef.current.classList.remove("focused");
  };

  return (
    <div className={`input-wrapper ${name}`} ref={wrapperRef}>
      <p className='upper-text'>{upperText}</p>
      <div className={`placeholder  ${content.length > 0 ? "" : "visible"} `}>{placeholder}</div>
      <div
        id={name}
        onFocus={focused}
        onBlur={blurred}
        ref={inputRef}
        className={`dynamic-details-input ${name}`}
        contentEditable={true}
        onInput={handleChange}
      ></div>
      <div className='limit-container'>
        {charactersNum}/{limit}
      </div>
    </div>
  );
}
