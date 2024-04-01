export default function VideoElements({ curIndex }) {
  return (
    <div className={`details-inner ${curIndex === 1 ? "visible" : ""}`}>
      <div>video -elements</div>
    </div>
  );
}
