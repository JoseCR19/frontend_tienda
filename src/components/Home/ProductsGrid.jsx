import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";
import ProductCard from "./ProductCard";
import { fetchNewArrivals } from "../../services/products";
import { productos as staticProducts } from "../data/products";
import { normalizeProducts } from "../../utils/products";

const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

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

const ProductsGrid = () => {
  const fallbackProducts = useMemo(() => {
    const normalized = normalizeProducts(staticProducts ?? []);
    const newOnes = normalized.filter((product) => product.isNew);
    const base = newOnes.length > 0 ? newOnes : normalized;
    return base.slice(0, 10);
  }, []);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const apiProducts = await fetchNewArrivals({
          signal: controller.signal,
        });
        if (controller.signal.aborted) {
          return;
        }

        if (apiProducts.length > 0) {
          setProducts(apiProducts.slice(0, 10));
        } else {
          setProducts(fallbackProducts);
        }
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Error al cargar productos:", err);
        setProducts(fallbackProducts);
        setError(err.message ?? "No pudimos cargar los productos.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();
    return () => controller.abort();
  }, [fallbackProducts]);

  const highlightedProducts = useMemo(() => {
    if (!products.length) {
      return [];
    }
    const newArrivals = products.filter((product) => product.isNew);
    const base = newArrivals.length > 0 ? newArrivals : products;
    return base.slice(0, 10);
  }, [products]);

  const productsToRender =
    highlightedProducts.length > 0
      ? highlightedProducts
      : products.length > 0
      ? products.slice(0, 10)
      : fallbackProducts;

  const showSkeleton = isLoading && products.length === 0;

  return (
    <Container>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-500">
            Nuevas llegadas
          </span>
          <h2 className="text-2xl font-semibold text-gray-900">
            Tendencias recien llegadas
          </h2>
          <p className="text-sm text-gray-600">
            Estrena lo ultimo agregado al catalogo con entregas en todo el pais.
          </p>
        </div>

        <Link
          to="/catalogo"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition-colors hover:text-red-400"
        >
          Ver catalogo completo
          <span aria-hidden="true">{"\u2192"}</span>
        </Link>
      </div>

      {error ? (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {showSkeleton
          ? skeletonItems.map((item) => <ProductSkeletonCard key={item} />)
          : productsToRender.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {!showSkeleton && products.length === 0 && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white px-4 py-5 text-sm text-gray-600">
          No encontramos productos recientes. Te mostramos una seleccion del catalogo.
        </div>
      )}
    </Container>
  );
};

export default ProductsGrid;
