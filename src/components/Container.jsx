export default function Container({ className = "", children }) {
  return <div className={`mx-auto w-full max-w-[1400px] ${className}`}>{children}</div>;
}
