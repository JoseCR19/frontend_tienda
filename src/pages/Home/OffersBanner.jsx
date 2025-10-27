import { useEffect, useMemo, useState } from "react";
import Container from "../../components/layout/Container";
import ProductCard from "../../components/Home/ProductCard";
import { fetchBestSellers } from "../../services/products";
import { productos } from "../../components/data/products";
import { normalizeProducts } from "../../utils/products";

const skeletonItems = Array.from({ length: 3 }, (_, index) => index);

const ProductSkeletonCard = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-slate-100" />
    <div className="mt-6 space-y-3">
      <div className="h-3 w-1/4 animate-pulse rounded bg-slate-100" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
      <div className="h-10 w-full animate-pulse rounded bg-slate-100" />
    </div>
  </div>
);

const OffersBanner = () => {
  const fallbackProducts = useMemo(() => {
    const normalized = normalizeProducts(productos ?? []);
    const bestSellers = normalized.filter(
      (item) =>
        item?.badge?.label?.toLowerCase() === "mas comprado" ||
        item?.segments?.includes?.("best-sellers")
    );
    const base = bestSellers.length > 0 ? bestSellers : normalized;
    return base.slice(0, 3);
  }, []);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const apiProducts = await fetchBestSellers({
          signal: controller.signal,
        });
        if (controller.signal.aborted) {
          return;
        }

        if (apiProducts.length > 0) {
          setProducts(apiProducts.slice(0, 3));
        } else {
          setProducts(fallbackProducts);
        }
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Error al cargar los productos más vendidos:", err);
        setProducts(fallbackProducts);
        setError(err.message ?? "No pudimos cargar los productos más vendidos.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();
    return () => controller.abort();
  }, [fallbackProducts]);

  const showSkeleton = isLoading && products.length === 0;
  const productsToRender = products.length > 0 ? products : fallbackProducts;

  return (
    <section>
      <Container>
        <div className="mb-8 space-y-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-500">
            Lo mas comprado
          </span>
          <h2 className="text-2xl font-semibold text-gray-900">
            Seleccionados para ti
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl">
            Descubre los productos favoritos de nuestra comunidad y lleva a casa
            lo que todos aman.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-5 lg:grid-cols-3">
          {showSkeleton
            ? skeletonItems.map((item) => <ProductSkeletonCard key={item} />)
            : productsToRender.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </Container>
    </section>
  );
};

export default OffersBanner;
