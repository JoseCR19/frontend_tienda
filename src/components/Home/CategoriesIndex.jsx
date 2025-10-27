import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";
import { fetchCategories } from "../../services/categories";
import { productos } from "../data/products";
import { buildFallbackCategoriesFromProducts } from "../../utils/categories";

const skeletonItems = Array.from({ length: 10 }, (_, index) => index);

const CategorySkeletonCard = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    <div className="aspect-[4/3] w-full animate-pulse bg-slate-100" />
    <div className="space-y-3 p-4">
      <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
      <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
    </div>
  </div>
);

const CategoriesIndex = () => {
  const fallbackCategories = useMemo(
    () => buildFallbackCategoriesFromProducts(productos ?? []),
    []
  );
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadCategories = async () => {
      setIsLoading(true);
      try {
        const apiCategories = await fetchCategories({ signal: controller.signal });
        if (controller.signal.aborted) {
          return;
        }

        if (apiCategories.length > 0) {
          const ordered = apiCategories
            .filter((category) => category?.title)
            .sort((a, b) => a.title.localeCompare(b.title, "es"));
          setCategories(ordered);
        } else {
          setCategories(fallbackCategories);
        }
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        console.error("Error cargando categorías:", err);
        setCategories(fallbackCategories);
        setError(err.message ?? "No pudimos cargar las categorías.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCategories();
    return () => controller.abort();
  }, [fallbackCategories]);

  const showSkeleton = isLoading && categories.length === 0;
  const categoriesToRender =
    categories.length > 0 ? categories : fallbackCategories;

  return (
    <main className="bg-gradient-to-b from-white to-slate-50 py-12">
      <Container>
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
            Classyshop Big Mega Store
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">Categorías</h1>
          <p className="mt-2 text-gray-600">
            Explora todas nuestras categorías y descubre nuevas colecciones.
          </p>
        </header>

        {error ? (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {showSkeleton ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {skeletonItems.map((item) => (
              <CategorySkeletonCard key={item} />
            ))}
          </div>
        ) : categoriesToRender.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-gray-600">
            No encontramos categorías disponibles en este momento.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {categoriesToRender.map((category) => (
              <Link
                key={category.slug ?? category.id}
                to={category.href ?? `/categorias/${category.slug}`}
                className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/70 transition-shadow hover:shadow-md hover:ring-red-300"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-slate-100">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-red-200">
                      {category.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900">
                      {category.title}
                    </h3>
                    {typeof category.count === "number" && category.count > 0 ? (
                      <span className="text-xs text-gray-500">
                        {category.count} prod.
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    Ver productos de {category.title}.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
};

export default CategoriesIndex;
