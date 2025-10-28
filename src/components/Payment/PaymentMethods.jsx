import React from "react";

const methods = [
  {
    id: "card",
    label: "Tarjeta de debito/credito",
    logo: "Logos_pagos/Visa.png",
  },
  { id: "yape", label: "Yape", logo: "Logos_pagos/Yape.png" },
  {
    id: "pagoefectivo",
    label: "PagoEfectivo",
    logo: "Logos_pagos/Pago_en_efectivo.png",
  },
];

const inputClass = (hasError) =>
  `p-3 border rounded sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
    hasError ? "border-red-400 focus:border-red-500 focus:ring-red-300" : ""
  }`;

const ErrorMessage = ({ message }) =>
  message ? <p className="mt-1 text-xs text-red-500">{message}</p> : null;

export default function PaymentMethods({
  selected,
  onChangeMethod,
  form,
  onChangeForm,
  errors = {},
}) {
  const isCard = selected === "card";

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium">Metodo de pago</h4>
        <div className="mt-2 grid gap-2">
          {methods.map((method) => (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center gap-3 rounded border p-3 ${
                selected === method.id
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                checked={selected === method.id}
                onChange={() => onChangeMethod(method.id)}
                className="accent-blue-600"
              />
              <img
                src={method.logo}
                alt={method.id}
                className="h-6 w-auto object-contain"
              />
              <div>
                <div className="font-medium">{method.label}</div>
                <div className="text-xs text-gray-500">
                  Selecciona y completa los datos requeridos
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium">Datos del pago</h4>
        <div className="mt-2">
          {isCard ? (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="md:col-span-2">
                <input
                  name="cardNumber"
                  value={form.cardNumber || ""}
                  onChange={onChangeForm}
                  placeholder="Numero de tarjeta (0000 0000 0000 0000)"
                  className={inputClass(Boolean(errors.cardNumber))}
                  inputMode="numeric"
                  maxLength={19}
                />
                <ErrorMessage message={errors.cardNumber} />
              </div>
              <div>
                <input
                  name="cardName"
                  value={form.cardName || ""}
                  onChange={onChangeForm}
                  placeholder="Nombre en la tarjeta"
                  className={inputClass(Boolean(errors.cardName))}
                />
                <ErrorMessage message={errors.cardName} />
              </div>
              <div>
                <input
                  name="cardExpiry"
                  value={form.cardExpiry || ""}
                  onChange={onChangeForm}
                  placeholder="MM/AA"
                  className={inputClass(Boolean(errors.cardExpiry))}
                  maxLength={5}
                  inputMode="numeric"
                />
                <ErrorMessage message={errors.cardExpiry} />
              </div>
              <div>
                <input
                  name="cardCVC"
                  value={form.cardCVC || ""}
                  onChange={onChangeForm}
                  placeholder="CVC"
                  className={inputClass(Boolean(errors.cardCVC))}
                  inputMode="numeric"
                  maxLength={4}
                />
                <ErrorMessage message={errors.cardCVC} />
              </div>
            </div>
          ) : null}

          {selected === "yape" ? (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <input
                  name="yapePhone"
                  value={form.yapePhone || ""}
                  onChange={onChangeForm}
                  placeholder="Numero Yape (987654321)"
                  className={inputClass(Boolean(errors.yapePhone))}
                  inputMode="numeric"
                  maxLength={12}
                />
                <ErrorMessage message={errors.yapePhone} />
              </div>
              <div>
                <input
                  name="yapeReference"
                  value={form.yapeReference || ""}
                  onChange={onChangeForm}
                  placeholder="Codigo de aprobacion (6 digitos)"
                  className={inputClass(Boolean(errors.yapeReference))}
                  inputMode="numeric"
                  maxLength={6}
                />
                <ErrorMessage message={errors.yapeReference} />
              </div>
            </div>
          ) : null}

          {selected === "pagoefectivo" ? (
            <div className="space-y-2">
              <select
                name="pagoBranch"
                value={form.pagoBranch || ""}
                onChange={onChangeForm}
                className={`p-3 w-full rounded border sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                  errors.pagoBranch
                    ? "border-red-400 focus:border-red-500 focus:ring-red-300"
                    : ""
                }`}
              >
                <option value="">Selecciona punto de pago</option>
                <option value="bcp">BCP - Agente</option>
                <option value="agente_pe">PagoEfectivo - Agente</option>
                <option value="tienda">Pago en tienda (store)</option>
              </select>
              <ErrorMessage message={errors.pagoBranch} />
              <div className="text-xs text-gray-500">
                Te llegaran instrucciones para completar el pago en el punto
                seleccionado.
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
