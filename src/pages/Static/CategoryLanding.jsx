import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../components/Home/ProductCard";
import Container from "../../components/layout/Container";
import { fetchCategories, fetchCategoryProducts } from "../../services/categories";
import { productos } from "../../components/data/products";
import { buildFallbackCategoriesFromProducts } from "../../utils/categories";
import { normalizeProducts } from "../../utils/products";
import { slugify } from "../../utils/strings";

const skeletonItems = Array.from({ length: 10 }, (_, index) => index);

const ProductSkeletonCard = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-slate-100" />
    <div className="mt-6 space-y-3">
      <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
      <div className="h-10 w-full animate-pulse rounded bg-slate-100" />
    </div>
  </div>
);

const buildFallbackProductsBySlug = () => {
  const normalizedProducts = normalizeProducts(productos ?? []);
  const categories = buildFallbackCategoriesFromProducts(productos ?? []);

  const bySlug = new Map();
  categories.forEach((category) => {
    const categorySlug = category.slug;
    const matched = normalizedProducts.filter((product) => {
      const productCategorySlug = slugify(product?.category ?? "");
      const segmentMatches = Array.isArray(product?.segments)
        ? product.segments.some((segment) => slugify(segment) === categorySlug)
        : false;
      return productCategorySlug === categorySlug || segmentMatches;
    });
    bySlug.set(categorySlug, matched);
  });

  return { categories, bySlug };
};

const pretty = (value = "") =>
  value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const CategoryLanding = () => {
  const { slug } = useParams();
  const normalizedSlug = useMemo(() => slugify(slug ?? ""), [slug]);

  const fallbackData = useMemo(buildFallbackProductsBySlug, []);
  const fallbackCategories = fallbackData.categories;
  const fallbackProductsBySlug = fallbackData.bySlug;

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeCategory = useMemo(() => {
    if (!normalizedSlug) {
      return null;
    }
    return (
      categories.find((category) => category.slug === normalizedSlug) ??
      fallbackCategories.find((category) => category.slug === normalizedSlug) ??
      null
    );
  }, [categories, fallbackCategories, normalizedSlug]);

  useEffect(() => {
    const controller = new AbortController();

    const loadCategoryData = async () => {
      if (!normalizedSlug) {
        return;
      }

      setIsLoading(true);
      try {
        const apiCategories = await fetchCategories({ signal: controller.signal });
        if (controller.signal.aborted) {
          return;
        }

        setCategories(apiCategories);

        const matchedCategory = apiCategories.find(
          (category) => category.slug === normalizedSlug
        );

        if (matchedCategory?.id) {
          try {
            const categoryProducts = await fetchCategoryProducts(matchedCategory.id, {
              signal: controller.signal,
            });
            if (!controller.signal.aborted) {
              setProducts(categoryProducts);
              setError(null);
            }
            return;
          } catch (productsError) {
            console.error("Error al cargar productos por categoría:", productsError);
            if (!controller.signal.aborted) {
              setError(productsError.message ?? "No pudimos cargar los productos.");
            }
          }
        }

        const fallbackProducts = fallbackProductsBySlug.get(normalizedSlug) ?? [];
        setProducts(fallbackProducts);
        if (!matchedCategory) {
          setError("No encontramos la categoría solicitada en el catálogo.");
        }
      } catch (categoryError) {
        if (controller.signal.aborted) {
          return;
        }
        console.error("Error al cargar la categoría:", categoryError);
        setCategories(fallbackCategories);
        const fallbackProducts = fallbackProductsBySlug.get(normalizedSlug) ?? [];
        setProducts(fallbackProducts);
        setError(categoryError.message ?? "No pudimos cargar la categoría seleccionada.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCategoryData();
    return () => controller.abort();
  }, [normalizedSlug, fallbackCategories, fallbackProductsBySlug]);

  const pageTitle = slug ? pretty(slug) : "Categorías";
  const showSkeleton = isLoading && products.length === 0;
  const productsToRender =
    products.length > 0
      ? products
      : fallbackProductsBySlug.get(normalizedSlug) ?? [];

  return (
    <main className="bg-gradient-to-b from-white to-slate-50 py-12">
      <Container>
        <header className="mb-6">
          <nav className="mb-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link to="/categorias" className="hover:text-gray-700">
              Categorías
            </Link>
            {slug && (
              <>
                <span className="mx-2">/</span>
                <strong className="text-gray-900">{pageTitle}</strong>
              </>
            )}
          </nav>
          <h1 className="text-3xl font-semibold text-gray-900">{pageTitle}</h1>
          {activeCategory ? (
            <p className="mt-2 text-gray-600">
              Descubre los productos de {activeCategory.title}.
            </p>
          ) : (
            <p className="mt-2 text-gray-600">
              Estamos cargando los productos asociados a esta categoría.
            </p>
          )}
        </header>

        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {showSkeleton ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {skeletonItems.map((item) => (
              <ProductSkeletonCard key={item} />
            ))}
          </div>
        ) : productsToRender.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-gray-600">
            No hay productos asociados a esta categoría por el momento.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {productsToRender.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
};

export default CategoryLanding;
