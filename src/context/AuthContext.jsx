import { createContext, useContext, useMemo, useState } from "react";
import { API_BASE_URL } from "../config/api";

const STORAGE_KEY = "classyshop:session";

const createEmptyState = () => ({
  token: null,
  user: null,
});

const readStoredAuth = () => {
  if (typeof window === "undefined") {
    return createEmptyState();
  }

  const storedValue = window.sessionStorage.getItem(STORAGE_KEY);
  if (!storedValue) {
    return createEmptyState();
  }

  try {
    const parsed = JSON.parse(storedValue);
    return {
      token: parsed?.token ?? null,
      user: parsed?.user ?? null,
    };
  } catch {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return createEmptyState();
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => readStoredAuth());

  const persistState = (nextState) => {
    setAuthState(nextState);

    if (typeof window === "undefined") {
      return;
    }

    if (nextState?.token) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      let message = "No pudimos iniciar sesion. Verifica tus credenciales.";
      try {
        const errorData = await response.json();
        if (typeof errorData?.message === "string" && errorData.message.trim()) {
          message = errorData.message;
        }
      } catch {
        // Ignoramos el error de parseo para mostrar el mensaje generico
      }
      throw new Error(message);
    }

    const data = await response.json();
    const nextState = {
      token: data?.token ?? null,
      user: data?.user ?? null,
    };

    persistState(nextState);

    return nextState;
  };

  const logout = async () => {
    const currentToken = authState.token;

    if (currentToken) {
      try {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        });
      } catch {
        // Si falla el logout del backend, igual limpiamos la sesion local
      }
    }

    persistState(createEmptyState());
  };

  const value = useMemo(
    () => ({
      user: authState.user,
      token: authState.token,
      isAuthenticated: Boolean(authState.token),
      login,
      logout,
    }),
    [authState]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
