export default function LoadingState({ className = "" }) {
  return (
    <div className={`w-full animate-pulse space-y-3 ${className}`} role="status" aria-label="Loading">
      <div className="h-4 w-2/3 rounded bg-current/10" />
      <div className="h-4 w-1/2 rounded bg-current/10" />
    </div>
  );
}
