import { useEffect, useMemo, useState } from "react";
import Container from "../../components/layout/Container";
import ProductCard from "../../components/Home/ProductCard";
import { fetchProducts } from "../../services/products";
import { productos as staticProducts } from "../../components/data/products";
import { normalizeProducts } from "../../utils/products";

const skeletonItems = Array.from({ length: 12 }, (_, index) => index);

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

const CatalogPage = () => {
  const fallbackProducts = useMemo(
    () => normalizeProducts(staticProducts ?? []),
    []
  );

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const apiProducts = await fetchProducts({ signal: controller.signal });
        if (controller.signal.aborted) {
          return;
        }

        if (apiProducts.length > 0) {
          setProducts(apiProducts);
        } else {
          setProducts(fallbackProducts);
        }
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Error al cargar el catalogo:", err);
        setProducts(fallbackProducts);
        setError(err.message ?? "No pudimos cargar el catalogo.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();
    return () => controller.abort();
  }, [fallbackProducts, refreshIndex]);

  const showSkeleton = isLoading && products.length === 0;
  const productsToDisplay =
    products.length > 0 ? products : fallbackProducts;

  const handleRetry = () => setRefreshIndex((value) => value + 1);

  return (
    <main className="bg-gradient-to-b from-white to-slate-50 py-12">
      <Container>
        <header className="mb-10 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-500">
                Catalogo completo
              </span>
              <h1 className="text-3xl font-semibold text-gray-900">
                Todos nuestros productos
              </h1>
              <p className="text-sm text-gray-600">
                Explora el catalogo completo de ClassyShop. Actualizamos la lista
                constantemente para que encuentres lo ultimo en tendencias.
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
              {productsToDisplay.length} productos disponibles
            </div>
          </div>

          {error ? (
            <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between">
              <span>{error}</span>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Reintentar
              </button>
            </div>
          ) : null}
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {showSkeleton
            ? skeletonItems.map((item) => <ProductSkeletonCard key={item} />)
            : productsToDisplay.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </section>

        {!showSkeleton && products.length === 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white px-4 py-5 text-sm text-gray-600">
            Te mostramos una seleccion del catalogo mientras sincronizamos con el servidor.
          </div>
        )}
      </Container>
    </main>
  );
};

export default CatalogPage;
