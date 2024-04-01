import { useEffect, useRef, useState } from "react";

export default function InputComponent({ name, upperText, placeholder, limit }) {
  const [charactersNum, setCharacterNum] = useState(0);
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const handleChange = (event) => {
    const input = event.target.innerText;
    if (input.length > limit) {
      // Prevent adding more characters
      event.target.innerText = input.slice(0, limit);
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
    }
  };

  return (
    <div className={`input-wrapper ${name}`}>
      <p className='upper-text'>{upperText}</p>
      <div className={`placeholder  ${content.length > 0 ? "" : "visible"} `}>{placeholder}</div>
      <div ref={inputRef} className={`dynamic-details-input ${name}`} contentEditable={true} onInput={handleChange}></div>
      <div className='limit-container'>
        {charactersNum}/{limit}
      </div>
    </div>
  );
}
