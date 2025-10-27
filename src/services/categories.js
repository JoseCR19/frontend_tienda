import { API_BASE_URL, ADMIN_TOKEN } from "../config/api";
import { normalizeCategories } from "../utils/categories";
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

const getErrorMessage = async (response) => {
  try {
    const data = await response.json();
    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }
  } catch {
    // ignore parse errors
  }
  return "No pudimos cargar las categorías.";
};

export const fetchCategories = async ({ signal } = {}) => {
  const response = await fetch(`${API_BASE_URL}/api/categories`, {
    headers: buildHeaders(),
    signal,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    return [];
  }

  return normalizeCategories(data);
};

export const fetchCategoryProducts = async (categoryId, { signal } = {}) => {
  if (!categoryId) {
    return [];
  }

  const response = await fetch(`${API_BASE_URL}/api/categories/${categoryId}/products`, {
    headers: buildHeaders(),
    signal,
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    return [];
  }

  return normalizeProducts(data);
};
