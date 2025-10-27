import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import Container from "../layout/Container";
import CartDrawer from "../Cart/CartDrawer";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const userDisplayName = user?.name?.split(" ")[0] || user?.email || "Mi cuenta";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesion:", error);
    }
  };

  // total count of items (sum of quantities)
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <>
      <header>
        <Topbar />
        <Container>
          <div className="w-full">
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between py-6 gap-4">
              <div className="flex-shrink-0">
                <Link to={"/"}>
                  <img src="/logo.jpg" alt="logo" className="h-12" />
                </Link>
              </div>

              <div className="flex-1 max-w-2xl">
                <Searchbar />
              </div>

              <div className="flex items-center gap-6">
                {isAuthenticated ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700">Hola, {userDisplayName}</span>
                    <Link
                      to="/mis-pedidos"
                      className="text-sm font-semibold text-blue-600 transition hover:text-blue-500"
                    >
                      Mis pedidos
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="whitespace-nowrap rounded-md border border-red-500 px-3 py-1 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      Cerrar sesion
                    </button>
                  </div>
                ) : (
                  <Link
                    to={"/login"}
                    className="whitespace-nowrap font-medium hover:text-blue-600 transition"
                  >
                    Acceder
                  </Link>
                )}

                <div className="flex items-center gap-3 text-2xl">
                  <button
                    type="button"
                    aria-label="Open cart"
                    onClick={() => setCartOpen(true)}
                    className="relative inline-flex items-center justify-center hover:scale-110 transition"
                  >
                    <span className="text-2xl hover:cursor-pointer">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        height={30}
                        width={30}
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    {totalItems > 0 && (
                      <span className="absolute -top-1 -right-3 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden py-4 space-y-4">
              {/* Row 1: Logo + Actions */}
              <div className="flex items-center justify-between">
                <Link to={"/"}>
                  <img src="/logo.jpg" alt="logo" className="h-10" />
                </Link>

                <div className="flex items-center gap-4">
                  {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-700">Hola, {userDisplayName}</span>
                      <Link
                        to="/mis-pedidos"
                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-500"
                      >
                        Mis pedidos
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-sm font-semibold text-red-500 transition hover:text-red-400"
                      >
                        Cerrar sesion
                      </button>
                    </div>
                  ) : (
                    <Link
                      to={"/login"}
                      className="text-sm font-medium whitespace-nowrap hover:text-blue-600 transition"
                    >
                      Acceder
                    </Link>
                  )}

                  <div className="flex items-center gap-2 text-xl">
                    <button
                      type="button"
                      aria-label="Open cart"
                      onClick={() => setCartOpen(true)}
                      className="relative inline-flex items-center justify-center"
                    >
                      <span className="text-xl hover:cursor-pointer">
                        {" "}
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          height={30}
                          width={30}
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                              stroke="#000000"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </g>
                        </svg>
                      </span>
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                          {totalItems}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Search Bar */}
              <div className="w-full">
                <Searchbar />
              </div>
            </div>
          </div>

          <Navbar />
        </Container>
      </header>

      {/* Cart drawer */}
      <CartDrawer open={isCartOpen} onClose={() => setCartOpen(false)}>
        {/* inside the drawer we render the actual Cart contents */}
        {/* Cart component should be able to run standalone using useCart() */}
      </CartDrawer>
    </>
  );
};

export default Header;
