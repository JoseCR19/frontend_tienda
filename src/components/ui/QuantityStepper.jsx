const QuantityStepper = ({
  value,
  min = 1,
  max = 99,
  onChange,
  className = "",
}) => {
  const decrease = () => {
    const next = Math.max(min, Number(value) - 1);
    if (next !== value) {
      onChange(next);
    }
  };

  const increase = () => {
    const next = Math.min(max, Number(value) + 1);
    if (next !== value) {
      onChange(next);
    }
  };

  const handleInput = (event) => {
    const raw = event.target.value.replace(/\D/g, "");
    if (!raw) {
      onChange(min);
      return;
    }
    const parsed = Math.min(max, Math.max(min, Number(raw)));
    onChange(parsed);
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={decrease}
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        aria-label="Disminuir cantidad"
      >
        -
      </button>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInput}
        className="w-12 border-none bg-transparent text-center text-base font-semibold text-gray-800 focus:outline-none"
        aria-label="Cantidad"
      />
      <button
        type="button"
        onClick={increase}
        className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        aria-label="Incrementar cantidad"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
