import { slugify } from "./strings";

const fallbackSlug = (value, index) =>
  value && value.trim() ? slugify(value) : `categoria-${index + 1}`;

export const normalizeCategories = (categories = []) =>
  categories.map((category, index) => {
    const rawName = category?.name ?? category?.title ?? "";
    const trimmedName = rawName.trim();
    const title = trimmedName || `Categoría ${index + 1}`;
    const slug = category?.slug ?? fallbackSlug(title, index);
    const image =
      category?.first_product_image ??
      category?.image ??
      category?.picture ??
      null;

    return {
      ...category,
      id: category?.id ?? slug ?? `category-${index + 1}`,
      name: title,
      title,
      slug,
      image,
      first_product_image: image,
      href: `/categorias/${slug}`,
    };
  });

export const buildFallbackCategoriesFromProducts = (products = []) => {
  const map = new Map();

  products.forEach((product, index) => {
    const rawCategory = (product?.category ?? "").trim();
    if (!rawCategory) {
      return;
    }

    const slug = slugify(rawCategory);
    const title = rawCategory
      .split(/[-\s]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const existing = map.get(slug);
    if (existing) {
      map.set(slug, {
        ...existing,
        first_product_image: existing.first_product_image ?? product?.picture ?? null,
        count: (existing.count ?? 0) + 1,
      });
    } else {
      map.set(slug, {
        id: `fallback-${slug}-${index}`,
        slug,
        name: title,
        first_product_image: product?.picture ?? null,
        count: 1,
      });
    }
  });

  return normalizeCategories(Array.from(map.values())).sort((a, b) =>
    a.title.localeCompare(b.title, "es")
  );
};
