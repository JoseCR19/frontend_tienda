const StaticPage = ({ title, description, children }) => {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50 py-16">
      <div className="mx-auto w-[80%] max-w-5xl space-y-8 text-gray-800">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
            Classyshop Big Mega Store
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-3xl text-base text-gray-600 md:text-lg">
              {description}
            </p>
          ) : null}
        </header>

        <section className="rounded-3xl border border-red-100/60 bg-white/80 p-8 shadow-[0_25px_60px_-40px_rgba(255,82,82,0.35)]">
          {children ? (
            children
          ) : (
            <p className="text-sm text-gray-600">
              Estamos preparando el contenido de esta sección. Muy pronto
              encontrarás guías, recomendaciones y beneficios exclusivos de
              Classyshop Big Mega Store.
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default StaticPage;
