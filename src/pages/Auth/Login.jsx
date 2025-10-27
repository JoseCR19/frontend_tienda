import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

const initialState = {
  email: "",
  password: "",
  remember: false,
};

const statusStyles = {
  success: "border-green-200 bg-green-50 text-green-700",
  error: "border-red-200 bg-red-50 text-red-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
};

const Login = () => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const highlightList = useMemo(
    () => [
      {
        title: "Compras mas inteligentes",
        description: "Accede a tus listas de favoritos y descubre ofertas basadas en tu historial.",
      },
      {
        title: "Seguimiento en tiempo real",
        description: "Monitorea el estado de tus pedidos desde cualquier dispositivo.",
      },
      {
        title: "Pagos seguros",
        description: "Tus datos siempre protegidos con estandares internacionales.",
      },
    ],
    []
  );

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (status?.type === "error") {
      setStatus(null);
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formState.email.trim()) {
      nextErrors.email = "Ingresa tu correo electronico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      nextErrors.email = "El correo electronico no es valido.";
    }

    if (!formState.password.trim()) {
      nextErrors.password = "Ingresa tu contrasena.";
    } else if (formState.password.length < 6) {
      nextErrors.password = "Tu contrasena debe tener al menos 6 caracteres.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await login({
        email: formState.email.trim(),
        password: formState.password,
      });
      setFormState(initialState);
      navigate("/", { replace: true });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "No pudimos iniciar sesion. Intentalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Accede a tu cuenta"
      subtitle="Bienvenido de nuevo"
      description="Ingresa tus credenciales para continuar disfrutando de todos los beneficios de nuestra tienda."
      highlightList={highlightList}
      footer={
        <span>
          Aun no tienes cuenta?{" "}
          <Link to="/register" className="font-semibold text-red-500 hover:text-red-400">
            Registrate aqui
          </Link>
        </span>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <TextField
            label="Correo electronico"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="tu@correo.com"
            value={formState.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <TextField
            label="Contrasena"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Ingresa tu contrasena"
            value={formState.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-600">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              checked={formState.remember}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-300"
            />
            Recordarme en este dispositivo
          </label>

          <button
            type="button"
            onClick={() =>
              setStatus({
                type: "info",
                message:
                  "Ingresa tu correo y te enviaremos las instrucciones para recuperar tu contrasena.",
              })
            }
            className="font-semibold text-red-500 transition-colors hover:text-red-400"
          >
            Olvidaste tu contrasena?
          </button>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </Button>

        {status ? (
          <div
            className={`rounded-lg border px-4 py-3 text-sm ${
              statusStyles[status.type] ?? statusStyles.info
            }`}
          >
            {status.message}
          </div>
        ) : null}
      </form>
    </AuthLayout>
  );
};

export default Login;
