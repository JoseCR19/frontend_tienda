const SmallButton = ({ children, className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      className={`w-12 h-12 rounded-full flex items-center justify-center border border-gray-300 bg-transparent hover:bg-gray-100 transition-colors hover:cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SmallButton;
