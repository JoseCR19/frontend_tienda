import { Link } from "react-router-dom";
import Container from "../layout/Container";

const Topbar = () => {
  return (
    <Container className="bg-red-500">
      <p className="text-white text-center">
        🎉 Hasta 50% de descuento en productos seleccionados por tiempo limitado
        🎉
      </p>
    </Container>
  );
};

export default Topbar;
