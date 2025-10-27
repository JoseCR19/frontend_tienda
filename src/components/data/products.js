import imageProduct1 from "../../assets/images/1.jpg";
import imageProduct2 from "../../assets/images/2.jpg";
import imageProduct3 from "../../assets/images/3.jpg";
import imageProduct4 from "../../assets/images/4.jpg";
import imageProduct5 from "../../assets/images/5.jpg";
import imageProduct6 from "../../assets/images/6.jpg";
import imageProduct7 from "../../assets/images/7.jpg";
import imageProduct8 from "../../assets/images/8.jpg";
import imageProduct9 from "../../assets/images/9.jpg";
import imageProduct10 from "../../assets/images/10.jpg";
import imageProduct11 from "../../assets/images/11.jpg";
import imageProduct12 from "../../assets/images/12.jpg";

export const productos = [
  /**
   * Best sellers destacados (lo más comprado)
   */
  {
    id: 1,
    slug: "samsung-galaxy-s22-graphite",
    picture: imageProduct1,
    brand: "Samsung",
    title: "Maletin Travel Graphite",
    price: 289,
    category: "equipaje",
    badge: { label: "Mas comprado", tone: "primary" },
    isNew: false,
    segments: ["best-sellers", "seleccion-destacada", "viajes"],
    stock: 18,
    description:
      "Maletin organizador en lona azul con cremalleras contrastantes. Protege tu laptop y accesorios en viajes de trabajo o universidad.",
    features: [
      "Compartimiento acolchado para laptop 15”",
      "Bolsillos frontales con cierre waterproof",
      "Asa lateral y correa removible acolchada",
    ],
    relatedIds: [2, 4, 11],
  },
  {
    id: 2,
    slug: "sillon-lounge-arena",
    picture: imageProduct2,
    brand: "Urban Pack",
    title: "Mochila Essential Verde Oliva",
    price: 229,
    category: "equipaje",
    badge: { label: "Mas comprado", tone: "primary" },
    isNew: false,
    segments: ["best-sellers", "seleccion-destacada", "viajes"],
    stock: 26,
    description:
      "Mochila minimalista en nylon repelente al agua con acabado mate. Ideal para uso urbano gracias a su peso ligero y multiples compartimientos.",
    features: [
      "Compartimiento para laptop 14”",
      "Espalda y tirantes acolchados con malla respirable",
      "Bolsillo frontal oculto con cierre magnetico",
    ],
    relatedIds: [1, 6, 9],
  },
  {
    id: 3,
    slug: "audifonos-wave-blue",
    picture: imageProduct3,
    brand: "City Chic",
    title: "Bolso Tote Turquesa City",
    price: 319,
    category: "moda",
    badge: { label: "Mas comprado", tone: "primary" },
    isNew: false,
    segments: ["best-sellers", "seleccion-destacada", "moda"],
    stock: 32,
    description:
      "Bolso tote en ecocuero turquesa con herrajes metalicos dorados y charm desmontable. Amplio espacio interior para el dia a dia.",
    features: [
      "Forro interno resistente a manchas",
      "Bolsillo interior con cierre y porta llaves",
      "Incluye correa larga regulable y charm metalico",
    ],
    relatedIds: [2, 7, 12],
  },
  {
    id: 4,
    slug: "maletin-soft-rosa",
    picture: imageProduct4,
    brand: "Urban Pack",
    title: "Maleta Soft Rose Carry-On",
    price: 389,
    category: "equipaje",
    badge: { label: "Mas comprado", tone: "primary" },
    isNew: false,
    segments: ["best-sellers", "viajes"],
    stock: 14,
    description:
      "Maleta de cabina rosa pastel con acabado water resistant y cierres reforzados. Interior con bandas elasticas y compartimiento para calzado.",
    features: [
      "Capacidad 35 L con peso de 2.8 kg",
      "Asa telescopica de aluminio y ruedas 360°",
      "Puerto USB exterior para power bank",
    ],
    relatedIds: [1, 2, 6],
  },

  /**
   * Nuevos ingresos destacados
   */
  {
    id: 5,
    slug: "purificador-aircare-pure",
    picture: imageProduct5,
    brand: "AirCare",
    title: "Duo Termos AirCare Stone",
    price: 189,
    category: "hogar",
    badge: null,
    isNew: true,
    segments: ["new-arrivals", "seleccion-destacada"],
    stock: 25,
    description:
      "Set de dos termos con revestimiento soft touch en tonos piedra. Mantienen bebidas calientes por 12 horas y frias por 24 horas.",
    features: [
      "Acero inoxidable grado 304 libre de BPA",
      "Tapa hermetica con vertido 360°",
      "Base antideslizante y cepillo de limpieza incluido",
    ],
    relatedIds: [2, 6, 10],
  },
  {
    id: 6,
    slug: "set-organizador-gourmet",
    picture: imageProduct6,
    brand: "SoftWeave",
    title: "Poncho Knit Taupe",
    price: 239,
    category: "moda",
    badge: null,
    isNew: true,
    segments: ["new-arrivals", "moda"],
    stock: 34,
    description:
      "Poncho ligero tejido en punto fino color taupe. Ideal para complementar outfits de media estacion con un estilo relajado y elegante.",
    features: [
      "Tejido hipoalergenico mezcla viscosa y algodon",
      "Terminaciones con costura invisible y cuello barco",
      "Lavado a mano o ciclo delicado, secado en plano",
    ],
    relatedIds: [2, 5, 10],
  },
  {
    id: 7,
    slug: "bolso-city-taupe",
    picture: imageProduct7,
    brand: "Nordic Time",
    title: "Reloj Loft Leather 40mm",
    price: 369,
    category: "accesorios",
    badge: null,
    isNew: true,
    segments: ["new-arrivals", "seleccion-destacada"],
    stock: 22,
    description:
      "Reloj analogico con correa de cuero marron y caratula minimalista de 40 mm. Ideal para looks casuales o ejecutivos.",
    features: [
      "Movimiento de cuarzo japones",
      "Resistencia al agua 3 ATM",
      "Correa intercambiable con cierre clasico",
    ],
    relatedIds: [2, 8, 9],
  },
  {
    id: 8,
    slug: "kit-glow-skin-advanced",
    picture: imageProduct8,
    brand: "PureGlow",
    title: "Camara 360 PureGlow Orbit",
    price: 899,
    category: "tecnologia",
    badge: null,
    isNew: true,
    segments: ["new-arrivals", "tecnologia"],
    stock: 30,
    description:
      "Camara panoramica 4K con soporte tripode integrando. Captura fotos y videos 360° y sincroniza con tu smartphone en segundos.",
    features: [
      "Video 4K 360° con estabilizacion",
      "Wi-Fi y Bluetooth para transmision en vivo",
      "Bateria intercambiable hasta 90 minutos",
    ],
    relatedIds: [7, 9, 12],
  },

  /**
   * Catalogo general (productos regulares)
   */
  {
    id: 9,
    slug: "organizador-modular-desk",
    picture: imageProduct9,
    brand: "Orderly",
    title: "Organizador Modular Desk",
    price: 189,
    category: "oficina",
    badge: null,
    isNew: false,
    segments: ["catalogo", "oficina"],
    stock: 42,
    description:
      "Sistema modular para escritorio en acabado cemento suave. Incluye bandeja para dispositivos, portalapices y separadores ajustables.",
    features: [
      "Base antideslizante en silicona",
      "Modulos imantados intercambiables",
      "Canal oculto para gestion de cables",
    ],
    relatedIds: [2, 7, 11],
  },
  {
    id: 10,
    slug: "cafetera-barista-smart",
    picture: imageProduct10,
    brand: "BrewMaster",
    title: "Cafetera Barista Smart",
    price: 899,
    category: "cocina",
    badge: null,
    isNew: false,
    segments: ["catalogo", "cocina"],
    stock: 18,
    description:
      "Cafetera automatica con molinillo ceramico integrado y control desde app para personalizar cada taza.",
    features: [
      "19 bares de presion y vaporizador profesional",
      "Reservorio de agua de 1.8 L",
      "Programas para espresso, latte y cold brew",
    ],
    relatedIds: [5, 6, 12],
  },
  {
    id: 11,
    slug: "mouse-gamer-onyx-7200",
    picture: imageProduct11,
    brand: "Onyx Gear",
    title: "Mouse Gamer Onyx 7200",
    price: 259,
    category: "gaming",
    badge: null,
    isNew: false,
    segments: ["catalogo", "gaming"],
    stock: 52,
    description:
      "Mouse ergonomico con sensor optico de 7200 DPI, iluminacion RGB personalizable y memoria interna para perfiles.",
    features: [
      "Seis botones programables",
      "Software para macros y ajustes DPI",
      "Cable mallado de alta resistencia (1.8 m)",
    ],
    relatedIds: [1, 3, 12],
  },
  {
    id: 12,
    slug: "parlante-pulse-mini",
    picture: imageProduct12,
    brand: "BeatBox",
    title: "Parlante Pulse Mini 360",
    price: 349,
    category: "audio",
    badge: null,
    isNew: false,
    segments: ["catalogo", "audio"],
    stock: 34,
    description:
      "Parlante portatil con sonido 360°, resistencia al agua IPX6 y 20 horas de autonomia. Ideal para exteriores.",
    features: [
      "Conexion Bluetooth 5.2 y modo Party-Link",
      "Microfono integrado con cancelacion de eco",
      "Puerto USB-C para carga rapida",
    ],
    relatedIds: [3, 7, 11],
  },
];
