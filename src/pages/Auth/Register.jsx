import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/AuthLayout";
import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

const statusStyles = {
  success: "border-green-200 bg-green-50 text-green-700",
  error: "border-red-200 bg-red-50 text-red-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
};

const Register = () => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const highlightList = useMemo(
    () => [
      {
        title: "Beneficios exclusivos",
        description: "Obten descuentos personalizados y acceso anticipado a lanzamientos.",
      },
      {
        title: "Tu informacion segura",
        description: "Protegemos tus datos con cifrado extremo a extremo.",
      },
      {
        title: "Compras mas rapidas",
        description: "Guarda tus direcciones y metodos de pago favoritos.",
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
    if (status) {
      setStatus(null);
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formState.firstName.trim()) {
      nextErrors.firstName = "Ingresa tu nombre.";
    }

    if (!formState.lastName.trim()) {
      nextErrors.lastName = "Ingresa tu apellido.";
    }

    if (!formState.email.trim()) {
      nextErrors.email = "Ingresa tu correo electronico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      nextErrors.email = "El correo electronico no es valido.";
    }

    if (!formState.phone.trim()) {
      nextErrors.phone = "Ingresa tu numero de telefono.";
    } else if (!/^(?:\+51\s?)?9\d{2}\s?\d{3}\s?\d{3}$/.test(formState.phone)) {
      nextErrors.phone = "Introduce un numero peruano valido (+51 y 9 digitos).";
    }

    if (!formState.password) {
      nextErrors.password = "Crea una contrasena segura.";
    } else {
      if (formState.password.length < 8) {
        nextErrors.password = "La contrasena debe tener al menos 8 caracteres.";
      }
      if (!/[A-Z]/.test(formState.password) || !/[0-9]/.test(formState.password)) {
        nextErrors.password =
          "Incluye al menos una letra en mayuscula y un numero para mayor seguridad.";
      }
    }

    if (!formState.confirmPassword) {
      nextErrors.confirmPassword = "Repite tu contrasena.";
    } else if (formState.confirmPassword !== formState.password) {
      nextErrors.confirmPassword = "Las contrasenas no coinciden.";
    }

    if (!formState.acceptTerms) {
      nextErrors.acceptTerms = "Debes aceptar los terminos y condiciones.";
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

    const payload = {
      name: formState.firstName.trim(),
      lastname: formState.lastName.trim(),
      email: formState.email.trim(),
      cellphone: formState.phone.replace(/\s+/g, " ").trim(),
      password: formState.password,
      terms: formState.acceptTerms,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "No pudimos crear tu cuenta. Intenta nuevamente.";
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

      try {
        await login({ email: payload.email, password: payload.password });
        setFormState(initialState);
        navigate("/", { replace: true });
      } catch (authError) {
        setStatus({
          type: "info",
          message:
            "Tu cuenta se creo correctamente, pero no pudimos iniciar sesion. Intenta ingresar manualmente.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "No pudimos crear tu cuenta. Intenta nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="Unete a nuestra tienda"
      description="Completa tus datos para comenzar a disfrutar de la mejor experiencia de compra en linea."
      highlightList={highlightList}
      footer={
        <span>
          Ya tienes cuenta?{" "}
          <Link to="/login" className="font-semibold text-red-500 hover:text-red-400">
            Inicia sesion
          </Link>
        </span>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Nombre"
            name="firstName"
            autoComplete="given-name"
            placeholder="Ej. Ana"
            value={formState.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />

          <TextField
            label="Apellido"
            name="lastName"
            autoComplete="family-name"
            placeholder="Ej. Perez"
            value={formState.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
            label="Telefono"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+51 987 654 321"
            value={formState.phone}
            onChange={handleChange}
            error={errors.phone}
            helperText="Incluye el codigo +51 y los 9 digitos de tu numero movil."
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Contrasena"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Contrasena segura"
            value={formState.password}
            onChange={handleChange}
            error={errors.password}
            helperText="Minimo 8 caracteres, con una mayuscula y un numero."
            required
          />

          <TextField
            label="Confirmar contrasena"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Repite tu contrasena"
            value={formState.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formState.acceptTerms}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-red-500 focus:ring-red-300"
            />
            <span>
              Acepto los{" "}
              <Link
                to="/terminos"
                className="font-semibold text-red-500 transition-colors hover:text-red-400"
              >
                terminos y condiciones
              </Link>{" "}
              y autorizo el tratamiento de mis datos.
            </span>
          </label>
          {errors.acceptTerms ? (
            <p className="text-sm text-red-500">{errors.acceptTerms}</p>
          ) : null}
        </div>

        <Button
          type="submit"
          className="w-full"
          variant="primary"
          size="large"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
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

export default Register;
