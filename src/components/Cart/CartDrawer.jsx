// src/components/Cart/CartDrawer.jsx
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Cart from "./Cart";

const CartDrawer = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    // prevent body scroll when cart is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-40 transition-opacity ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div onClick={onClose} className={`absolute inset-0 bg-black/40`} />
      </div>

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 z-45 h-full w-[320px] sm:w-[420px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Carro de compras</h3>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="text-gray-600 px-2 py-1 hover:cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-auto h-[calc(100%-64px)]">
          <Cart onClick={onClose} />
        </div>
      </aside>
    </>
  );
};

CartDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

CartDrawer.defaultProps = {
  open: false,
};

export default CartDrawer;
