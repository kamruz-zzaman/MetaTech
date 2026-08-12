export default function HighlightedText({ segments, highlightClassName = "text-brand-green" }) {
  return segments.map((segment, index) => (
    <span key={index} className={segment.highlight ? highlightClassName : undefined}>
      {segment.text}
    </span>
  ));
}
