import Container from "../layout/Container";

const footerLinks = {
  tienda: [
    { label: "Catálogo", href: "/categorias" },
    { label: "Novedades", href: "/novedades" },
    { label: "Ofertas", href: "/ofertas" },
    { label: "Blog de estilo", href: "/blog" },
  ],
  ayuda: [
    { label: "Centro de ayuda", href: "/ayuda" },
    { label: "Cambios y devoluciones", href: "/ayuda/devoluciones" },
    { label: "Envíos y seguimiento", href: "/ayuda/envios" },
    { label: "Preguntas frecuentes", href: "/ayuda/faq" },
  ],
  empresa: [
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Trabaja con nosotros", href: "/empleos" },
    { label: "Programas corporativos", href: "/corporativo" },
    { label: "Sostenibilidad", href: "/sostenibilidad" },
  ],
};

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M13.5 8.5V6.75c0-.69.56-1.25 1.25-1.25H16V3h-1.25A3.75 3.75 0 0 0 11 6.75V8.5H9v2.75h2v10.75h2.5V11.25H16l.5-2.75h-3Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://twitter.com",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="m4 4 6.9 8.5L4.4 20h2.4l5.2-5.5L15.8 20H20l-7.3-9.1L19.4 4h-2.4l-4.6 4.9L8.2 4H4Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M20.6 6.2c-.2-.7-.7-1.2-1.4-1.4C18 4.5 12 4.5 12 4.5s-6 0-7.2.3c-.7.2-1.2.7-1.4 1.4C3 7.3 3 10 3 10s0 2.7.4 3.8c.2.7.7 1.2 1.4 1.4C6 15.5 12 15.5 12 15.5s6 0 7.2-.3c.7-.2 1.2-.7 1.4-1.4.3-1.1.4-3.8.4-3.8s-.1-2.7-.4-3.8ZM10 7.8l4.8 2.2L10 12.2V7.8Z" />
      </svg>
    ),
  },
];

const FooterColumn = ({ title, links }) => (
  <nav aria-label={title} className="space-y-3 text-sm">
    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-200">
      {title}
    </h3>
    <ul className="space-y-2 text-gray-300">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="transition hover:text-white focus:outline-none focus-visible:text-white"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const Footer = () => {
  return (
    <footer className="relative mt-16 bg-[#111827] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,99,132,0.2)_0,transparent_45%)]" />

      <Container className="relative">
        <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-semibold">
                TH
              </span>
              <div>
                <h2 className="text-lg font-semibold tracking-wide">
                  CLASSYSHOP Big Mega Store
                </h2>
                <p className="text-sm text-gray-400">
                  Cuidamos cada detalle de tu compra, desde el clic hasta tu hogar.
                </p>
              </div>
            </div>

            <div className="grid gap-6 text-sm text-gray-300 md:grid-cols-2">
              <div>
                <p className="font-semibold uppercase tracking-wide text-gray-200">
                  Visítanos
                </p>
                <p>Av. Independencia 2832, Lima - Perú</p>
                <p>Lun a Sab 09:00 - 20:00</p>
              </div>
              <div>
                <p className="font-semibold uppercase tracking-wide text-gray-200">
                  Contáctanos
                </p>
                <p>
                  <a
                    href="tel:+51987654321"
                    className="text-lg font-semibold text-white transition hover:text-red-300"
                  >
                    (+51) 987 654 321
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:soporte@classyshopbigmegastore.com.pe"
                    className="transition hover:text-red-300"
                  >
                    soporte@classyshopbigmegastore.com.pe
                  </a>
                </p>
              </div>
            </div>

            <form className="space-y-3 text-sm" noValidate>
              <p className="font-semibold uppercase tracking-wide text-gray-200">
                Noticias y beneficios
              </p>
              <p className="text-gray-400">
                Suscríbete para recibir recomendaciones personalizadas y
                promociones exclusivas.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="tu@correo.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-gray-400 focus:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
                >
                  Suscribirme
                </button>
              </div>
            </form>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <FooterColumn title="Tienda" links={footerLinks.tienda} />
            <FooterColumn title="Ayuda" links={footerLinks.ayuda} />
            <FooterColumn title="Empresa" links={footerLinks.empresa} />

            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-200">
                Sigamos en contacto
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:border-red-300 hover:bg-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
                  >
                    <span aria-hidden="true">{item.icon}</span>
                  </a>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-gray-400">
                  Compras 100% seguras a través de nuestros partners:
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-gray-300">
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    Visa
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    Mastercard
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    Yape
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1">
                    Plin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-gray-500 md:flex-row md:text-sm">
          <p>
            © {new Date().getFullYear()} CLASSYSHOP Big Mega Store. Todos los derechos
            reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/legal/privacidad"
              className="transition hover:text-white focus:outline-none focus-visible:text-white"
            >
              Política de privacidad
            </a>
            <a
              href="/legal/cookies"
              className="transition hover:text-white focus:outline-none focus-visible:text-white"
            >
              Política de cookies
            </a>
            <a
              href="/legal/terminos"
              className="transition hover:text-white focus:outline-none focus-visible:text-white"
            >
              Términos y condiciones
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
