export default function CheckComponent({ id, selectedIds }) {
  const isChecked = selectedIds.includes(id);

  return (
    <div className='checkbox-wrapper-46'>
      <div className={`checkbox-row-data ${isChecked ? "checked" : ""}`}></div>
      <label htmlFor='cbx-46' className='cbx'>
        <span>
          <svg viewBox='0 0 12 10' height='10px' width='12px'>
            <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
          </svg>
        </span>
      </label>
    </div>
  );
}

export function MainCheckComponent({ selectedIds, rowGroupToRender, allSelected }) {
  const isChecked = allSelected;
  const isCheckedButHasUnselectedSome = selectedIds.length < rowGroupToRender.length;

  return (
    <div className='checkbox-wrapper-46'>
      <div className={`checkbox-row-data ${isChecked ? "checked" : ""}`}></div>
      <label htmlFor='cbx-46' className='cbx'>
        <span>
          {isCheckedButHasUnselectedSome && isChecked ? (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' height='10px' width='12px' style={{ fill: "black", fillOpacity: "1" }}>
              <path d='M160-440v-80h640v80H160Z' />
            </svg>
          ) : (
            <svg viewBox='0 0 12 10' height='10px' width='12px'>
              <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
            </svg>
          )}
        </span>
      </label>
    </div>
  );
}
