import InputComponent from "../../../../../../utilities/input-component";

export default function Details({ curIndex }) {
  return (
    <div className={`details-inner ${curIndex === 0 ? "visible" : ""}`}>
      <div className='section-details-top'>
        <p className='section-title'>Details</p>
        <p>REUSE DETAILS</p>
      </div>
      <div className='details-middle'>
        <div className='details-left'>
          <InputComponent
            name={"details-title"}
            upperText={"Title (required)"}
            placeholder={"A title that tells your viewers about your video"}
            limit={600}
          />
          <InputComponent
            name={"description"}
            upperText={"Description"}
            placeholder={"Tell viewers about your video (type @ to mention a channel)"}
            limit={5000}
          />
        </div>
        <div className='details-right'> </div>
      </div>
    </div>
  );
}
