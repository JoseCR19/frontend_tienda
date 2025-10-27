// src/components/OrderSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="container mx-auto max-w-2xl text-center p-8 my-10">
      <div className="flex justify-center mb-6">
        <svg
          className="success-checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
        >
          <circle
            className="success-checkmark-circle"
            cx="30"
            cy="30"
            r="25"
            fill="none"
          />
          <polyline
            className="success-checkmark-check"
            fill="none"
            points="18,31 26,39 42,23"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4">¡Gracias por tu compra!</h1>
      <p className="text-gray-600 mb-8">
        Tu pedido ha sido procesado exitosamente. Recibirás un correo de
        confirmación en breve.
      </p>
      <Link
        to="/" // Enlace a la página de inicio
        className="py-3 px-6 rounded bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-700 transition font-bold"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default OrderSuccess;
