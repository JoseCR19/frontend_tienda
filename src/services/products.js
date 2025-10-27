import { API_BASE_URL, ADMIN_TOKEN } from "../config/api";
import { normalizeProducts } from "../utils/products";

const buildHeaders = () => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (ADMIN_TOKEN) {
    headers.append("X-Admin-Token", ADMIN_TOKEN);
  }

  return headers;
};

const getErrorMessage = async (response, fallbackMessage = "No pudimos cargar los productos.") => {
  try {
    const data = await response.json();
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
  } catch {
    // ignore parsing issues
  }
  return fallbackMessage;
};

const fetchProductsFrom = async (path, { signal } = {}, errorMessage) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: buildHeaders(),
    signal,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response, errorMessage));
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    return [];
  }

  return normalizeProducts(data);
};

export const fetchProducts = (options) =>
  fetchProductsFrom("/api/products", options);

export const fetchNewArrivals = (options) =>
  fetchProductsFrom(
    "/api/products/new-arrivals",
    options,
    "No pudimos cargar los productos nuevos."
  );

export const fetchBestSellers = (options) =>
  fetchProductsFrom(
    "/api/products/best-sellers",
    options,
    "No pudimos cargar los productos más vendidos."
  );
