import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdditionalData } from "../store/Upload-slice";
import { PosEnd } from "./place-caret-at-end";

export default function InputComponent({ defaultText, name, upperText, placeholder, limit }) {
  const [charactersNum, setCharacterNum] = useState(0);
  const [content, setContent] = useState("");
  const inputRef = useRef();
  const wrapperRef = useRef();
  const dispatch = useDispatch();
  const timeoutRef = useRef();

  useEffect(() => {
    const div = inputRef.current;
    div.innerText = defaultText ? defaultText : "";
    setContent(defaultText ? defaultText : "");
    setCharacterNum(defaultText ? defaultText.length : 0);
    dispatch(updateAdditionalData({ [`${name}`]: defaultText }));

    // Place the caret at the end of the contentEditable div
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(div);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [defaultText]);

  const handleChange = (event) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    const input = event.target.innerText;
    console.log(input);
    if (input.length > limit) {
      // Prevent adding more characters
      const limitedContent = input.slice(0, limit);
      const div = event.target;
      div.innerText = limitedContent;

      // Place the caret at the end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(div);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);

      timeoutRef.current = setTimeout(() => {
        dispatch(updateAdditionalData({ [`${name}`]: `${limitedContent}` }));
      }, 600);
    } else {
      // Update the state with the new number of characters
      setCharacterNum(input.length);
      setContent(input);
      timeoutRef.current = setTimeout(() => {
        dispatch(updateAdditionalData({ [`${name}`]: `${input}` }));
      }, 600);
    }
  };

  const focused = (e) => {
    wrapperRef.current.classList.add("focused");
  };
  const blurred = () => {
    wrapperRef.current.classList.remove("focused");
  };

  return (
    <div className={`input-wrapper ${name} ${content.length === 0 && name === "title" ? "error" : ""}`} ref={wrapperRef}>
      <p className='upper-text'>{upperText}</p>
      <div className={`placeholder  ${content.length > 0 ? "" : "visible"} `}>{placeholder}</div>
      <div
        id={name}
        onFocus={focused}
        onBlur={blurred}
        ref={inputRef}
        className={`dynamic-details-input ${name} `}
        contentEditable={true}
        onInput={handleChange}
      ></div>
      <div className='limit-container'>
        {charactersNum}/{limit}
      </div>
    </div>
  );
}
