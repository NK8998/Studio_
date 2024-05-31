import { CountDropDown } from "../../../../../../../assets/contentelements";

export default function EditOption() {
  return (
    <div className='edit-option toolbar-section'>
      <button className='edit-options toolbar-section toolbar-section-button'>
        <p>Edit</p>
        <CountDropDown />
      </button>
    </div>
  );
}
