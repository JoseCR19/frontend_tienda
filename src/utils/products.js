import { slugify } from "./strings";

const DEFAULT_BRAND = "ClassyShop";

export const normalizeProduct = (product = {}, index = 0) => {
  const title = String(product?.title ?? product?.name ?? "").trim();
  const resolvedTitle = title || `Producto ${index + 1}`;
  const slugCandidate = product?.slug ?? slugify(resolvedTitle);
  const slug = slugCandidate || `producto-${index + 1}`;
  const candidateArray = Array.isArray(product?.images) ? product.images : [];
  const pictureFromArray =
    candidateArray.find((url) => typeof url === "string" && url.trim()) ?? "";

  const picture =
    product?.picture ??
    product?.image ??
    product?.picture_url ??
    product?.image_url ??
    pictureFromArray ??
    "";

  return {
    ...product,
    id: product?.id ?? slug ?? `product-${index}`,
    title: resolvedTitle,
    name: product?.name ?? resolvedTitle,
    slug,
    picture,
    price: Number(product?.price ?? 0),
    brand: product?.brand ?? DEFAULT_BRAND,
    isNew: product?.isNew ?? product?.new ?? false,
    badge: product?.badge
      ? product.badge
      : product?.badge_label
      ? { label: product.badge_label, tone: "primary" }
      : null,
    money: product?.money ?? "PEN",
  };
};

export const normalizeProducts = (products = []) =>
  products.map((product, index) => normalizeProduct(product, index));
