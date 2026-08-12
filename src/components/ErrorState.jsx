export default function ErrorState({ message = "Something went wrong loading this section.", className = "" }) {
  return (
    <p className={`text-sm text-red-500 ${className}`} role="alert">
      {message}
    </p>
  );
}
