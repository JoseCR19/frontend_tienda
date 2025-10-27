import { useCallback, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

const OrderSkeleton = () => (
  <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
    <div className="flex items-center justify-between">
      <div className="h-5 w-48 animate-pulse rounded bg-slate-100" />
      <div className="h-5 w-24 animate-pulse rounded bg-slate-100" />
    </div>
    <div className="space-y-2">
      <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
      <div className="h-4 w-56 animate-pulse rounded bg-slate-100" />
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  </div>
);

const emptyOrders = [];

const mapOrderItems = (items = []) =>
  items.map((item, index) => ({
    id: item.id ?? `${item.productId ?? index}-${index}`,
    productId: item.productId ?? item.id,
    title: item.title ?? item.name ?? `Producto ${index + 1}`,
    quantity: item.quantity ?? 1,
    price: Number(item.price) ?? 0,
    picture: item.picture ?? item.image ?? null,
  }));

const OrderHistory = () => {
  const { token, isAuthenticated } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState(emptyOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    if (!token) {
      setOrders(emptyOrders);
      setIsLoading(false);
      setError("Debes iniciar sesion para ver tus pedidos.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Tu sesion ha vencido. Vuelve a iniciar sesion.");
        }
        throw new Error("Error al cargar el historial de pedidos.");
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        setOrders(emptyOrders);
        setError("No pudimos interpretar la respuesta del servidor.");
        return;
      }

      const normalizedOrders = data.map((order) => ({
        id: order.id,
        total: Number(order.total) ?? 0,
        paymentType: order.payment_type ?? order.type_payment ?? "card",
        createdAt: order.order_date ?? order.created_at ?? order.createdAt,
        customer: order.customer_details ?? order.customer ?? {},
        items: mapOrderItems(order.items),
      }));

      setOrders(normalizedOrders);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message ?? "Ocurrio un problema al obtener tus pedidos.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetchOrders();
    window.addEventListener("focus", fetchOrders);
    return () => {
      window.removeEventListener("focus", fetchOrders);
    };
  }, [fetchOrders, token]);

  const hasOrders = orders.length > 0;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 lg:p-8">
      <h1 className="mb-8 text-3xl font-bold">Mi historial de ordenes</h1>

      {isLoading ? (
        <div className="space-y-6">
          <OrderSkeleton />
          <OrderSkeleton />
        </div>
      ) : error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-600">
          {error}
        </div>
      ) : !hasOrders ? (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-600">
          Aun no registras pedidos. Cuando compres, veras tu historial aqui.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Orden #{order.id}</h2>
                  <p className="text-sm text-gray-500">
                    Fecha:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "Sin fecha"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Metodo de pago: {order.paymentType}
                  </p>
                </div>
                <span className="text-lg font-semibold text-red-500">
                  S/.{order.total.toFixed(2)}
                </span>
              </div>

              <ul className="space-y-3">
                {order.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded bg-slate-100">
                      {item.picture ? (
                        <img
                          src={item.picture}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                          {item.title.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        Cantidad: {item.quantity} | Precio: S/.
                        {Number(item.price).toFixed(2)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
