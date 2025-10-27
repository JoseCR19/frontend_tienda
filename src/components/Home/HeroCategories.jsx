import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import CategoryCard from "./CategoryCard";
import { slugify } from "../../utils/strings";

import categoryTechnology from "../../assets/images/11-cz_categoryimagelist.jpg";
import categoryFashion from "../../assets/images/12-cz_categoryimagelist.jpg";
import categoryWatches from "../../assets/images/13-cz_categoryimagelist.jpg";
import categoryBeauty from "../../assets/images/14-cz_categoryimagelist.jpg";
import categoryHome from "../../assets/images/15-cz_categoryimagelist.jpg";
import categoryGadgets from "../../assets/images/16-cz_categoryimagelist.jpg";

const fallbackOrder = [
  categoryTechnology,
  categoryFashion,
  categoryWatches,
  categoryBeauty,
  categoryHome,
  categoryGadgets,
];

const fallbackBySlug = {
  tecnologia: categoryTechnology,
  "tecnologia-tablets": categoryTechnology,
  "moda-mujer": categoryFashion,
  moda: categoryFashion,
  accesorios: categoryWatches,
  relojes: categoryWatches,
  "relojes-accesorios": categoryWatches,
  belleza: categoryBeauty,
  "belleza-cuidado": categoryBeauty,
  cuidado: categoryBeauty,
  hogar: categoryHome,
  "hogar-decoracion": categoryHome,
  decoracion: categoryHome,
  gadgets: categoryGadgets,
  "gadgets-smart-home": categoryGadgets,
};

const defaultCategories = [
  {
    id: "category-tecnologia",
    image: categoryTechnology,
    title: "Tecnología & Tablets",
    href: "/categorias/tecnologia",
  },
  {
    id: "category-moda-mujer",
    image: categoryFashion,
    title: "Moda Mujer",
    href: "/categorias/moda-mujer",
  },
  {
    id: "category-relojes",
    image: categoryWatches,
    title: "Relojes & Accesorios",
    href: "/categorias/relojes",
  },
  {
    id: "category-belleza",
    image: categoryBeauty,
    title: "Belleza & Cuidado",
    href: "/categorias/belleza",
  },
  {
    id: "category-hogar",
    image: categoryHome,
    title: "Hogar & Decoración",
    href: "/categorias/hogar",
  },
  {
    id: "category-gadgets",
    image: categoryGadgets,
    title: "Gadgets & Smart Home",
    href: "/categorias/gadgets",
  },
];

const categorySkeletons = Array.from({ length: 5 }, (_, index) => ({
  id: `skeleton-${index}`,
}));

const ensureCategoryAttributes = (category, index) => {
  const title = category?.title?.trim() || "Categoría";
  const slug =
    category?.href?.split("/").filter(Boolean).pop() ??
    slugify(title) ??
    `categoria-${index}`;

  const fallbackImage =
    fallbackBySlug[slug] ??
    fallbackOrder[index % fallbackOrder.length] ??
    fallbackOrder[0];

  return {
    id: category?.id ?? slug ?? `categoria-${index}`,
    title,
    href: category?.href ?? `/categorias/${slug}`,
    image: category?.image || fallbackImage,
  };
};

const CategorySkeletonCard = () => (
  <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
    <div className="relative h-36 w-full animate-pulse rounded-xl bg-slate-100" />
    <div className="mt-4 flex items-center justify-between">
      <span className="h-4 w-32 animate-pulse rounded bg-slate-100" />
      <span className="h-4 w-5 animate-pulse rounded bg-slate-100" />
    </div>
  </div>
);

const HeroCategories = ({ categories = [], isLoading = false }) => {
  const hasCategories = Array.isArray(categories) && categories.length > 0;
  const categoriesToRender = hasCategories
    ? categories.map(ensureCategoryAttributes)
    : defaultCategories;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
            Explora por categoría
          </h2>
          <p className="text-sm text-gray-500">
            Encuentra productos seleccionados para cada momento del día.
          </p>
        </div>
        <a
          href="/categorias"
          className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-400"
        >
          Ver todas las categorías
          <span aria-hidden="true">{"\u2192"}</span>
        </a>
      </div>

      {isLoading && !hasCategories ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categorySkeletons.map((skeleton) => (
            <CategorySkeletonCard key={skeleton.id} />
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          spaceBetween={18}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            480: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.5 },
            1280: { slidesPerView: 5.5 },
          }}
          className="category-swiper"
        >
          {categoriesToRender.map((category, index) => (
            <SwiperSlide key={category.id ?? index}>
              <CategoryCard
                image={category.image}
                title={category.title}
                href={category.href}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default HeroCategories;
