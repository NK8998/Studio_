export default function Visibility({ curIndex }) {
  return (
    <div className={`details-inner ${curIndex === 3 ? "visible" : ""}`}>
      <div>visibility</div>
    </div>
  );
}
