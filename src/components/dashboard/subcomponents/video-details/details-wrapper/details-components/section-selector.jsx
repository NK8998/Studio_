export default function SectionSelector({ curSection, setCurSection }) {
  const sections = ["Details", "Video elements", "Checks", "Visibility"];

  const elements = sections.map((section, index) => {
    return (
      <>
        <button className={`section-button-selector ${curSection === index ? "active" : ""} `} onClick={() => setCurSection(index)}>
          <p>{section}</p>
          <div className='indicator-container'>
            <div className='indicator'></div>
          </div>
        </button>
        {index > 0 && <div className={`line-indicator num-${index} ${index <= curSection ? "active" : ""}`}></div>}
      </>
    );
  });
  return (
    <div className='section-selector'>
      <div className='sections'>{elements}</div>
    </div>
  );
}