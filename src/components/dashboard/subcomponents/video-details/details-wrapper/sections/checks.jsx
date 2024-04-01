export default function Checks({ curIndex }) {
  return (
    <div className={`details-inner ${curIndex === 2 ? "visible" : ""}`}>
      <div>checks</div>
    </div>
  );
}
