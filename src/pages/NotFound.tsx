import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "Erro 404: O usuário tentou acessar uma rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="text-center">
        <h1 className="mb-4 text-8xl font-bold">404</h1>
        <p className="mb-4 text-3xl text-gray-600">Oops! Página não encontrada</p>
        <a href="/" className="text-(--primary) underline hover:text-(--primary-medium)">
          Retornar ao início
        </a>
      </main>
    </div>
  );
};

export default NotFound;
