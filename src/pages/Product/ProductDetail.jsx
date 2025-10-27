import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/layout/Container";
import Button from "../../components/ui/Button";
import QuantityStepper from "../../components/ui/QuantityStepper";
import ProductCard from "../../components/Home/ProductCard";
import { useCart } from "../../context/CartContext";
import { productos } from "../../components/data/products";

const badgeTheme = {
  primary: "bg-red-500 text-white",
  subtle: "bg-white/80 text-red-500 ring-1 ring-inset ring-red-200",
  neutral: "bg-gray-100 text-gray-700",
};

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = useMemo(
    () =>
      productos.find(
        (item) => item.slug === productId || String(item.id) === productId
      ),
    [productId]
  );

  const [quantity, setQuantity] = useState(1);
  const [statusMessage, setStatusMessage] = useState("");

  const formattedPrice = useMemo(() => {
    const parsed = Number(product?.price) || 0;
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      maximumFractionDigits: 0,
    }).format(parsed);
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const pool = productos.filter((item) => item.id !== product.id);
    const byRelation = pool.filter((item) =>
      product.relatedIds?.includes(item.id)
    );

    if (byRelation.length >= 4) {
      return byRelation.slice(0, 4);
    }

    const byCategory = pool.filter(
      (item) =>
        item.category === product.category &&
        !byRelation.some((related) => related.id === item.id)
    );

    const fallback = pool.filter(
      (item) =>
        !byRelation.some((related) => related.id === item.id) &&
        !byCategory.some((related) => related.id === item.id)
    );

    return [...byRelation, ...byCategory, ...fallback].slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <main className="bg-gradient-to-br from-pink-50 via-white to-red-50">
        <Container className="py-24">
          <div className="mx-auto max-w-xl rounded-3xl bg-white p-12 text-center shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-900">
              Producto no encontrado
            </h1>
            <p className="mt-4 text-sm text-gray-600">
              No pudimos encontrar el producto que buscabas. Revisa si el enlace
              esta correcto o explora nuestras categorias.
            </p>
            <Button className="mt-6" onClick={() => navigate("/")}>
              Volver al inicio
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  const badgeLabel =
    product?.badge?.label ?? (product?.isNew ? "Nuevo" : undefined);
  const badgeTone =
    product?.badge?.tone ?? (product?.isNew ? "primary" : "neutral");
  const categoryLabel = product.category
    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
    : "";

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setStatusMessage("Producto agregado al carrito.");
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setStatusMessage(
      "Producto agregado. Revisa tu carrito para completar la compra."
    );
  };

  return (
    <main className="bg-gradient-to-br from-pink-50 via-white to-red-50">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr),minmax(0,1fr)] lg:items-start">
          <section className="overflow-hidden rounded-3xl bg-white p-10 shadow-xl">
            <div className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 via-white to-slate-50 p-10">
              {badgeLabel ? (
                <span
                  className={`absolute left-10 top-10 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${badgeTheme[badgeTone] ?? badgeTheme.primary}`}
                >
                  {badgeLabel}
                </span>
              ) : null}

              <img
                src={product.picture}
                alt={product.title}
                className="w-full max-w-md object-contain"
                loading="lazy"
              />
            </div>

            <div className="mt-8 grid gap-4 text-sm text-gray-600 lg:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs uppercase text-gray-400">Disponibilidad</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Stock: {product.stock} unidades
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs uppercase text-gray-400">Categoria</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {categoryLabel}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <p className="text-xs uppercase text-gray-400">Entrega</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Envio gratis desde S/.200
                </p>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-8 rounded-3xl bg-white p-10 shadow-xl">
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-red-400 transition hover:text-red-500"
              >
                <span aria-hidden="true">&#x2190;</span> Volver
              </button>
              <h1 className="text-3xl font-semibold text-gray-900">
                {product.title}
              </h1>
              <p className="text-sm text-gray-600">{product.description}</p>
            </div>

            <div className="rounded-2xl bg-red-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-400">
                Precio online
              </p>
              <p className="mt-2 text-4xl font-bold text-red-500">
                {formattedPrice}
              </p>
              <p className="mt-1 text-xs text-red-400">
                Impuestos incluidos. Precio valido solo en tienda online.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Cantidad
                </p>
                <QuantityStepper value={quantity} onChange={setQuantity} />
              </div>

              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 justify-center"
                  variant="primary"
                  size="large"
                >
                  Agregar al carrito
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 justify-center border-red-200 bg-white text-red-500 hover:bg-red-50"
                  variant="outline"
                  size="large"
                >
                  Comprar ahora
                </Button>
              </div>
            </div>

            {statusMessage ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {statusMessage}
              </div>
            ) : null}

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Lo que te va a encantar
              </h2>
              <ul className="mt-4 grid gap-3 text-sm text-gray-700">
                {product.features?.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 grid h-2.5 w-2.5 place-items-center rounded-full bg-red-400"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section className="mt-16">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Productos relacionados
              </h2>
              <p className="text-sm text-gray-600">
                Combina tu compra con recomendaciones pensadas para ti.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-400"
            >
              Ver mas productos
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
};

export default ProductDetail;
