import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Navigation,
  EffectFade,
  Pagination,
  Autoplay,
} from "swiper/modules";

import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import HeroCategories from "../../components/Home/HeroCategories";
import { fetchCategories } from "../../services/categories";

import sampleImage1 from "../../assets/images/sample-1.jpg";
import sampleImage2 from "../../assets/images/sample-2.jpg";


const heroSlides = [
  {
    id: "coleccion-fashion",
    eyebrow: "Nueva colección 2025",
    badge: "Hasta 40% off",
    title: "Exprésate con la moda que vive contigo",
    description:
      "Encuentra prendas ligeras, accesorios versátiles y todo lo que necesitas para renovar tu clóset esta temporada.",
    ctaLabel: "Explorar novedades",
    ctaHref: "/coleccion",
    secondaryLabel: "Ver lookbook",
    secondaryHref: "/lookbook",
    image: sampleImage1,
    backgroundClass:
      "bg-gradient-to-r from-[#ffe5ec] via-white to-white dark:from-rose-100",
    accentColor: "text-rose-500",
    accentBackground: "bg-rose-500",
    stats: [
      { value: "120+", label: "Nuevos looks" },
      { value: "48 h", label: "Envío express" },
      { value: "S/.59", label: "Desde" },
    ],
  },
  {
    id: "mood-hogar",
    eyebrow: "Diseño para tu casa",
    badge: "Edición limitada",
    title: "Espacios cálidos con acabados naturales",
    description:
      "Combina textiles suaves y piezas escandinavas para darle personalidad a cada rincón. Descubre sets listos para instalar.",
    ctaLabel: "Comprar hogar",
    ctaHref: "/hogar",
    secondaryLabel: "Guía de decoración",
    secondaryHref: "/guia-decoracion",
    image: sampleImage2,
    backgroundClass:
      "bg-gradient-to-r from-[#e7f3ff] via-white to-white dark:from-sky-100",
    accentColor: "text-sky-600",
    accentBackground: "bg-sky-500",
    stats: [
      { value: "60+", label: "Sets combinados" },
      { value: "3x", label: "Meses sin intereses" },
      { value: "S/.199", label: "Combos desde" },
    ],
  },
];

const HeroSection = () => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const apiCategories = await fetchCategories({ signal: controller.signal });
        if (!controller.signal.aborted) {
          setCategories(apiCategories);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error cargando categorias:", error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingCategories(false);
        }
      }
    };

    loadCategories();
    return () => controller.abort();
  }, []);

  const heroCategories = useMemo(() => {
    if (!categories.length) {
      return [];
    }
    return categories.filter((category) => category?.title);
  }, [categories]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-white">
      <div className="pointer-events-none absolute top-[-20%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-100/60 blur-3xl" />
      <Container className="relative py-12">
        <div className="space-y-12">
          <Swiper
            navigation
            effect="fade"
            loop
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="hero-swiper"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <article
                  className={`group relative grid overflow-hidden rounded-[32px] px-8 py-12 shadow-[0_40px_80px_-40px_rgba(255,82,82,0.35)] transition md:px-16 lg:grid-cols-[1.05fr,0.95fr] lg:items-center ${slide.backgroundClass}`}
                >
                  <div
                    className="pointer-events-none absolute inset-y-4 right-4 hidden rounded-[28px] bg-cover bg-center opacity-80 blur-0 transition duration-500 group-hover:opacity-90 lg:block"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,0.05) 65%, transparent 100%), url(${slide.image})`,
                    }}
                  />
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                      <span>{slide.eyebrow}</span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${slide.accentBackground} text-white`}
                      >
                        {slide.badge}
                      </span>
                    </div>

                    <h1 className="text-3xl font-semibold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
                      {slide.title}
                    </h1>

                    <p className="max-w-xl text-base text-gray-600 md:text-lg">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                      <Button
                        size="large"
                        className="shadow-lg shadow-red-200 md:px-6 md:py-3"
                        onClick={() => {
                          if (slide.ctaHref) window.location.href = slide.ctaHref;
                        }}
                      >
                        {slide.ctaLabel}
                      </Button>

                      {slide.secondaryLabel ? (
                        <a
                          href={slide.secondaryHref ?? "#"}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition hover:text-red-500"
                        >
                          {slide.secondaryLabel}
                          <span aria-hidden="true">→</span>
                        </a>
                      ) : null}
                    </div>

                    <dl className="mt-6 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
                      {slide.stats?.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex flex-col rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur"
                        >
                          <dt className={`text-lg font-semibold ${slide.accentColor}`}>
                            {stat.value}
                          </dt>
                          <dd className="text-xs uppercase tracking-wide text-gray-500">
                            {stat.label}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <figure className="relative flex items-center justify-center lg:justify-end">
                    <div className="absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-white via-white/60 to-transparent md:block" />
                    <div
                      className="absolute -right-6 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl md:right-4 lg:h-96 lg:w-96"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255,255,255,0.85) 0%, rgba(255,82,82,0.18) 55%, transparent 70%)",
                      }}
                    />
                    {/*
                    <img
                      src={slide.image}
                      alt={slide.title}
                      loading="lazy"
                      className="relative z-10 w-4/5 max-w-xs translate-x-8 rounded-[28px] border border-white/70 object-cover shadow-[0_45px_60px_-30px_rgba(14,44,78,0.35)] md:max-w-sm lg:max-w-lg"
                    />
                    */}
                  </figure>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <HeroCategories
            categories={heroCategories}
            isLoading={isLoadingCategories}
          />
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
