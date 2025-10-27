import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import SmallButton from "../ui/SmallButton";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";

const badgeStyles = {
  primary:
    "bg-red-500 text-white shadow-md",
  subtle:
    "bg-white/90 text-red-500 shadow-sm ring-1 ring-inset ring-red-200",
  neutral:
    "bg-gray-100 text-gray-700",
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { brand, picture, title, price, money } = product;

  const brandLabel = brand || "ClassyShop";
  const displayTitle = title || product?.name || "Producto sin nombre";
  const imageUrl = picture || "";
  const currency = typeof money === "string" && money.trim().length === 3 ? money : "PEN";

  const formattedPrice = useMemo(() => {
    const parsed = Number(price) || 0;
    try {
      return new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(parsed);
    } catch {
      return `S/. ${parsed.toFixed(2)}`;
    }
  }, [price, currency]);

  const heroBadgeLabel = product?.badge?.label;
  const heroBadgeTone = product?.badge?.tone ?? "primary";
  const showNewBadge = Boolean(product?.isNew);

  const detailPath = product?.slug
    ? `/product/${product.slug}`
    : `/product/${product?.id}`;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleGoToDetail = () => {
    navigate(detailPath);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-slate-50 px-6 pt-6">
        {heroBadgeLabel ? (
          <span
            className={`absolute left-6 top-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badgeStyles[heroBadgeTone] ?? badgeStyles.primary}`}
          >
            {heroBadgeLabel}
          </span>
        ) : null}

        <SmallButton
          aria-label="Agregar a favoritos"
          className="absolute right-6 top-6 h-10 w-10 border-0 bg-white/90 text-red-500 shadow-sm transition hover:bg-red-50"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
          >
            <path
              d="M12 20.25C12 20.25 4.75 15 4.75 9.75C4.75 6.29822 7.54822 3.5 11 3.5C12.6129 3.5 14.1594 4.14647 15.25 5.25002C16.3406 4.14647 17.8871 3.5 19.5 3.5C22.9518 3.5 25.75 6.29822 25.75 9.75C25.75 15 18.5 20.25 18.5 20.25H12Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-2.5 -1.5)"
            />
          </svg>
        </SmallButton>

        <Link to={detailPath} className="block w-full">
          <div className="aspect-[4/3] w-full overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={displayTitle}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-50 via-white to-slate-50 text-4xl font-semibold text-red-300">
                {displayTitle.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            {brandLabel}
          </span>
          {product?.isNew ? (
            <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-600">
              Nuevo
            </span>
          ) : null}
        </div>

        <Link
          to={detailPath}
          className="text-sm font-semibold text-gray-900 transition-colors hover:text-red-500 line-clamp-2"
        >
          {displayTitle}
        </Link>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-red-500">
              {formattedPrice}
            </span>

            <button
              type="button"
              onClick={handleGoToDetail}
              className="inline-flex items-center gap-2 rounded-full border border-transparent bg-red-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-600 transition-colors hover:bg-red-200"
            >
              Comprar ahora
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3.5 7H10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7.875 3.5L10.5 7L7.875 10.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <Button
            type="button"
            size="small"
            variant="primary"
            className="w-full justify-center"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
