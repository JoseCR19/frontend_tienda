import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Contacto from "./pages/Contact/Contacto";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ProductDetail from "./pages/Product/ProductDetail";
import CatalogPage from "./pages/Product/Catalog";
import StaticPage from "./pages/Static/StaticPage";

// Páginas de categorías
import CategoriesIndex from "./components/Home/CategoriesIndex";
import CategoryLanding from "./pages/Static/CategoryLanding";

// checkout / pedidos
import CheckoutPage from "./components/CheckoutPage";
import OrderSuccess from "./components/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/catalogo" element={<CatalogPage />} />

        {/* ✅ CATEGORÍAS */}
        <Route path="/categorias" element={<CategoriesIndex />} />
        <Route path="/categorias/:slug" element={<CategoryLanding />} />

        {/* Páginas estáticas varias */}
        <Route
          path="/novedades"
          element={
            <StaticPage
              title="Novedades"
              description="Los lanzamientos más recientes, tendencias globales y colaboraciones especiales, todo en un solo lugar."
            />
          }
        />
        <Route
          path="/ofertas"
          element={
            <StaticPage
              title="Ofertas"
              description="Aprovecha descuentos exclusivos por tiempo limitado y arma tus combos favoritos con precios especiales."
            />
          }
        />
        <Route
          path="/blog"
          element={
            <StaticPage
              title="Blog de estilo"
              description="Consejos de moda, inspiración para tu hogar y recomendaciones pensadas para que vivas con estilo cada día."
            />
          }
        />
        <Route
          path="/coleccion"
          element={
            <StaticPage
              title="Colección especial"
              description="Colecciones cápsula, materiales premium y piezas únicas diseñadas para destacar."
            />
          }
        />
        <Route
          path="/lookbook"
          element={
            <StaticPage
              title="Lookbook"
              description="Conoce cómo combinamos nuestras piezas favoritas. Inspírate con outfits listos para replicar."
            />
          }
        />
        <Route
          path="/hogar"
          element={
            <StaticPage
              title="Hogar"
              description="Textiles, iluminación y muebles que harán que cada rincón de tu casa se sienta único."
            />
          }
        />
        <Route
          path="/guia-decoracion"
          element={
            <StaticPage
              title="Guía de decoración"
              description="Tips y guías para renovar tus ambientes con soluciones accesibles y llenas de estilo."
            />
          }
        />
        <Route
          path="/ayuda"
          element={
            <StaticPage
              title="Centro de ayuda"
              description="Resolvemos tus dudas y te acompañamos antes, durante y después de tu compra."
            />
          }
        />
        <Route
          path="/ayuda/devoluciones"
          element={
            <StaticPage
              title="Cambios y devoluciones"
              description="Conoce los pasos para gestionar un cambio o devolución de manera rápida y sencilla."
            />
          }
        />
        <Route
          path="/ayuda/envios"
          element={
            <StaticPage
              title="Envíos y seguimiento"
              description="Consulta tiempos de envío, tarifas y cómo seguir tu pedido en tiempo real."
            />
          }
        />
        <Route
          path="/ayuda/faq"
          element={
            <StaticPage
              title="Preguntas frecuentes"
              description="Encuentra respuestas inmediatas a las consultas más comunes de nuestra comunidad."
            />
          }
        />
        <Route
          path="/sobre-nosotros"
          element={
            <StaticPage
              title="Sobre nosotros"
              description="Conoce la historia, valores y propósito de CLASSYSHOP Big Mega Store."
            />
          }
        />
        <Route
          path="/empleos"
          element={
            <StaticPage
              title="Trabaja con nosotros"
              description="Únete a un equipo apasionado. Descubre las oportunidades que tenemos para ti."
            />
          }
        />
        <Route
          path="/corporativo"
          element={
            <StaticPage
              title="Programas corporativos"
              description="Soluciones personalizadas para empresas, regalos corporativos y beneficios para tus colaboradores."
            />
          }
        />
        <Route
          path="/sostenibilidad"
          element={
            <StaticPage
              title="Sostenibilidad"
              description="Nuestro compromiso con el diseño responsable, materiales conscientes y cadenas de producción éticas."
            />
          }
        />

        {/* Checkout / pedidos */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/mis-pedidos" element={<OrderHistory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
