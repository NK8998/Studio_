import { useRef } from "react";
import { ChevronLeft, ChevronRight, CountDropDown, FirstPage, LastPage } from "../../../../../assets/contentelements";

export default function RowHandler({ rows, setRows, currentPage, setCurrentPage, length, groupsLength }) {
  const dropdownRef = useRef();

  const handleRemovingDropdown = (e) => {
    if (!e.target.classList.contains("rows-count-dropdown") && !e.target.closest(".rows-count-dropdown") && !e.target.closest(".rows-count-picker")) {
      dropdownRef.current.classList.remove("show");
      document.removeEventListener("click", handleRemovingDropdown);
    }
  };

  const handleClick = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.toggle("show");
    }
    document.addEventListener("click", handleRemovingDropdown);
  };

  const rowOptions = [3, 6, 9];

  const pickerElements = rowOptions.map((rowOption) => {
    return (
      <div
        className={`row-option ${rowOption === rows ? "current" : ""}`}
        onClick={() => {
          setCurrentPage(0);
          setRows(rowOption);
          localStorage.setItem("rowsPerPage", JSON.stringify(rowOption));
        }}
        key={rowOption}
      >
        {rowOption}
      </div>
    );
  });

  const startingnumber = currentPage * rows + 1;

  let totalShown = Math.min((currentPage + 1) * rows, length);

  return (
    <div className='row-handler'>
      <div className='row-count'>
        <p>Rows per page: </p>
        <button type='button' className='rows-count-picker' onClick={handleClick}>
          {rows} <CountDropDown />
        </button>
        <div ref={dropdownRef} className='rows-count-dropdown'>
          {pickerElements}
        </div>
      </div>
      <div className='current-row-indictor'>
        <p>
          {startingnumber} - {totalShown} of {length}
        </p>
      </div>
      <div className='row-changer'>
        <div className='row-changer-arrow' onClick={() => setCurrentPage(0)}>
          <FirstPage />
        </div>
        <div className='row-changer-arrow' onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}>
          <ChevronLeft />
        </div>
        <div className='row-changer-arrow' onClick={() => setCurrentPage((prev) => Math.min(prev + 1, groupsLength - 1))}>
          <ChevronRight />
        </div>
        <div className='row-changer-arrow' onClick={() => setCurrentPage(groupsLength - 1)}>
          <LastPage />
        </div>
      </div>
    </div>
  );
}
