// src/components/CheckoutPage.jsx
import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import PaymentRibbon from "./Payment/PaymentRibbon";
import PaymentMethods from "./Payment/PaymentMethods";
import { API_BASE_URL } from "../config/api";
import { normalizeProducts } from "../utils/products";

const FormField = ({ label, name, value, onChange, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="mt-1 block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
      {...props}
    />
  </div>
);

const buildInitialFormData = (user) => {
  const fullName = [user?.name, user?.lastname].filter(Boolean).join(" ").trim();
  return {
    name: fullName,
    email: user?.email ?? "",
    address: user?.address ?? "",
    city: user?.city ?? "",
    postalCode: user?.postalCode ?? "",
    country: user?.country ?? "",
    cardName: fullName,
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    yapePhone: user?.cellphone ?? "",
    yapeReference: "",
    pagoBranch: "",
  };
};

const CheckoutPage = () => {
  const { cart, getTotal, clearCart, removeFromCart } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const normalizedCart = useMemo(() => normalizeProducts(cart ?? []), [cart]);

  const [formData, setFormData] = useState(() => buildInitialFormData(user));
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentErrors, setPaymentErrors] = useState({});
  const [submissionError, setSubmissionError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const initial = buildInitialFormData(user);
    setFormData((prev) => ({
      ...prev,
      name: initial.name || prev.name,
      email: initial.email || prev.email,
      address: initial.address || prev.address,
      city: initial.city || prev.city,
      postalCode: initial.postalCode || prev.postalCode,
      country: initial.country || prev.country,
      cardName: initial.cardName || prev.cardName,
      yapePhone: initial.yapePhone || prev.yapePhone,
    }));
  }, [user]);

  const sanitizeFieldValue = (name, value) => {
    switch (name) {
      case "cardNumber": {
        const digits = value.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(.{4})/g, "$1 ").trim();
      }
      case "cardExpiry": {
        const digits = value.replace(/\D/g, "").slice(0, 4);
        if (digits.length <= 2) {
          return digits;
        }
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
      }
      case "cardCVC":
        return value.replace(/\D/g, "").slice(0, 4);
      case "yapePhone":
        return value.replace(/\D/g, "").slice(0, 11);
      case "yapeReference":
        return value.replace(/\D/g, "").slice(0, 6);
      default:
        return value;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const sanitized = sanitizeFieldValue(name, value);
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    if (paymentErrors[name]) {
      setPaymentErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validatePaymentData = () => {
    const errors = {};

    if (paymentMethod === "card") {
      const digits = (formData.cardNumber || "").replace(/\D/g, "");
      if (digits.length !== 16) {
        errors.cardNumber = "Ingresa un numero de tarjeta valido de 16 digitos.";
      }
      if (!formData.cardName || formData.cardName.trim().length < 3) {
        errors.cardName = "Ingresa el nombre tal como figura en la tarjeta.";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry || "")) {
        errors.cardExpiry = "Usa el formato MM/AA (mes entre 01 y 12).";
      }
      const cvcDigits = (formData.cardCVC || "").replace(/\D/g, "");
      if (!(cvcDigits.length === 3 || cvcDigits.length === 4)) {
        errors.cardCVC = "El CVC debe tener 3 o 4 digitos.";
      }
    } else if (paymentMethod === "yape") {
      const phoneDigits = (formData.yapePhone || "").replace(/\D/g, "");
      if (!/^(?:51)?9\d{8}$/.test(phoneDigits)) {
        errors.yapePhone = "Ingresa un numero Yape valido (9 digitos, inicia en 9).";
      }
      const referenceDigits = (formData.yapeReference || "").replace(/\D/g, "");
      if (referenceDigits.length !== 6) {
        errors.yapeReference = "El codigo de aprobacion debe tener 6 digitos.";
      }
    } else if (paymentMethod === "pagoefectivo") {
      if (!formData.pagoBranch) {
        errors.pagoBranch = "Selecciona el punto de pago donde completaras la operacion.";
      }
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionError(null);

    if (!token) {
      setSubmissionError("Debes iniciar sesion para completar el pedido.");
      return;
    }

    setIsSubmitting(true);

    const validationErrors = validatePaymentData();
    if (Object.keys(validationErrors).length > 0) {
      setPaymentErrors(validationErrors);
      setSubmissionError("Revisa los datos del metodo de pago antes de continuar.");
      setIsSubmitting(false);
      return;
    }

    setPaymentErrors({});

    try {
      const itemsPayload = normalizedCart
        .map((item) => ({
          productId: Number(item.productId ?? item.id),
          quantity: Number(item.quantity ?? 1),
          price: Number(item.price) ?? 0,
          title: item.title ?? item.name ?? "",
          sku: item.sku ?? item.productCode ?? item.slug ?? String(item.id),
        }))
        .filter((item) => {
          const validProduct = Number.isFinite(item.productId) && item.productId > 0;
          const validQuantity = Number.isFinite(item.quantity) && item.quantity > 0;
          const validPrice = Number.isFinite(item.price) && item.price >= 0;
          return validProduct && validQuantity && validPrice;
        });

      if (itemsPayload.length === 0) {
        throw new Error(
          "No se encontraron productos validos en el carrito. Intenta nuevamente."
        );
      }

      const orderData = {
        paymentType: paymentMethod,
        total: getTotal(),
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          paymentMethod,
          yapePhone: formData.yapePhone || undefined,
          pagoBranch: formData.pagoBranch || undefined,
        },
        items: itemsPayload,
      };

      const response = await fetch(`${API_BASE_URL}/api/orders/me`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const message = `El servidor fallo al guardar la orden (status ${response.status})`;
        throw new Error(message);
      }

      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Error al enviar la orden:", error);
      setSubmissionError(
        error.message || "No pudimos registrar tu pedido. Intentalo nuevamente."
      );
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (normalizedCart.length === 0) {
    if (isSubmitting) {
      return <div className="p-8 text-center">Procesando...</div>;
    }
    return (
      <div className="container mx-auto my-10 max-w-2xl p-8 text-center">
        <div className="mb-6 flex justify-center">
          <svg>
            <g>
              <g>
                <path d="M107.415,145.798c0.399,3.858,3.656,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231 l-3.459-33.468c-0.426-4.12-4.113-7.111-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L107.415,145.798z"></path>
                <path d="M154.351,152.488c0.262,0.027,0.522,0.04,0.78,0.04c3.796,0,7.052-2.872,7.451-6.73l3.458-33.468 c0.426-4.121-2.569-7.806-6.689-8.231c-4.123-0.421-7.806,2.57-8.232,6.689l-3.458,33.468 C147.235,148.377,150.23,152.062,154.351,152.488z"></path>
                <path d="M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221 c12.801,0,23.216-10.417,23.216-23.221C119.494,195.502,109.079,185.088,96.278,185.088z M96.278,216.523 c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215 C104.494,212.835,100.808,216.523,96.278,216.523z"></path>
                <path d="M173.719,185.088c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.414,23.221,23.216,23.221 c12.802,0,23.218-10.417,23.218-23.221C196.937,195.502,186.521,185.088,173.719,185.088z M173.719,216.523 c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215 C181.937,212.835,178.251,216.523,173.719,216.523z"></path>
                <path d="M218.58,79.08c-1.42-1.837-3.611-2.913-5.933-2.913H63.152l-6.278-24.141c-0.86-3.305-3.844-5.612-7.259-5.612H18.876 c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.94l6.227,23.946c0.031,0.134,0.066,0.267,0.104,0.398l23.157,89.046 c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.21-89.25C220.49,83.309,220,80.918,218.58,79.08z M183.638,165.418H86.362l-19.309-74.25h135.895L183.638,165.418z"></path>
              </g>
            </g>
          </svg>
        </div>
        <h2 className="mb-4 text-2xl font-semibold text-gray-900">
          Tu carrito esta vacio
        </h2>
        <p className="mb-6 text-gray-600">
          Agrega productos para continuar con el pago.
        </p>
        <Button onClick={() => navigate("/")}>Seguir comprando</Button>
      </div>
    );
  }

  return (
    <>
      <PaymentRibbon />
      <div className="container mx-auto max-w-7xl py-10">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Datos personales</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Nombre completo"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Correo electronico"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Direccion"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Ciudad"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Codigo postal"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
                <FormField
                  label="Pais"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Detalles de Pago</h2>
              <PaymentMethods
                selected={paymentMethod}
                onChangeMethod={setPaymentMethod}
                form={formData}
                onChangeForm={handleInputChange}
                errors={paymentErrors}
              />
              {submissionError ? (
                <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {submissionError}
                </div>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">Resumen del Pedido</h2>
              <ul className="mb-6 space-y-4">
                {normalizedCart.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.picture}
                        alt={item.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">
                          Cantidad: {item.quantity ?? 1}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-medium">
                        S/.{((Number(item.price) || 0) * (item.quantity ?? 1)).toFixed(2)}
                      </div>
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-3 text-sm"
                        type="button"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={20}
                        >
                          <path
                            d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>S/.{getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envio</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between pt-2 text-lg font-bold">
                  <span>Total</span>
                  <span>S/.{getTotal().toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded bg-blue-600 py-3 font-bold text-white transition hover:cursor-pointer hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isSubmitting ? "Procesando..." : `Pagar S/.${getTotal().toFixed(2)}`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
