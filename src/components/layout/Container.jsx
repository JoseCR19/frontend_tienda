export default function Container({ children, className = "" }) {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="w-[80%] max-w-7xl">{children}</div>
    </div>
  );
}
