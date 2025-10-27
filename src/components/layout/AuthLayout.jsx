import Container from "./Container";

const AuthLayout = ({
  title,
  subtitle,
  description,
  children,
  highlightList = [],
  footer,
}) => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      <Container className="py-16">
        <div className="grid w-full gap-12 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
          <section className="order-2 flex flex-col gap-8 rounded-3xl bg-white/90 p-10 shadow-xl backdrop-blur-sm lg:order-1">
            <div className="space-y-3">
              {subtitle ? (
                <p className="text-sm font-semibold uppercase tracking-wide text-red-500">
                  {subtitle}
                </p>
              ) : null}
              <h1 className="text-3xl font-semibold text-gray-900 lg:text-4xl">
                {title}
              </h1>
              {description ? (
                <p className="text-base text-gray-600">{description}</p>
              ) : null}
            </div>

            <div>{children}</div>

            {footer ? <div className="pt-2 text-sm text-gray-600">{footer}</div> : null}
          </section>

          <aside className="order-1 overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 via-red-400 to-red-300 p-[1px] shadow-xl lg:order-2">
            <div className="flex h-full min-h-[320px] flex-col justify-between gap-10 rounded-[22px] bg-white/95 p-10 text-gray-900">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500 ring-1 ring-inset ring-red-100">
                  Compra facil, ahorra mas
                </div>
                <h2 className="text-3xl font-semibold leading-tight">
                  Todo lo que amas de la tienda, ahora mas cerca de ti.
                </h2>
                <p className="text-sm text-gray-600">
                  Administra tus pedidos, guarda tus productos favoritos y
                  recibe recomendaciones personalizadas desde un solo lugar.
                </p>
              </div>

              {highlightList.length > 0 ? (
                <ul className="grid gap-4 text-sm text-gray-700">
                  {highlightList.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-500">
                        <svg
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.5 11.2 3.3 8l1.4-1.4L6.5 8.4l4.8-4.8 1.4 1.4-6.2 6.2Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        {item.description ? (
                          <p className="text-gray-600">{item.description}</p>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="flex items-center gap-3 pt-4">
                <img
                  src="/logo.jpg"
                  alt="Tienda Home logo"
                  className="h-10 w-10 rounded-full border border-red-100 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Tu tienda de confianza
                  </p>
                  <p className="text-xs text-gray-500">
                    Mas de 50.000 pedidos entregados
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
};

export default AuthLayout;
