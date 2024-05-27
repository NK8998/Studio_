export default function SectionSelector({ curSection, setCurSection }) {
  const sections = ["Details", "Video elements", "Checks", "Visibility"];

  const elements = sections.map((section, index) => {
    return (
      <div>
        <button
          className={`section-button-selector ${curSection === index ? "active" : ""} `}
          onClick={() => setCurSection(index)}
          key={`${index}-button`}
        >
          <p>{section}</p>
          <div className='indicator-container'>
            <div className='indicator'></div>
          </div>
        </button>
        {index > 0 && <div className={`line-indicator num-${index} ${index <= curSection ? "active" : ""}`} key={`${index}-line`}></div>}
      </div>
    );
  });
  return (
    <div className='section-selector'>
      <div className='sections'>{elements}</div>
    </div>
  );
}
