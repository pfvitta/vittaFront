import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-10 px-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo + descripción */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Vitta</h2>
          <p className="text-sm">Tu bienestar comienza con un buen profesional.</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Suscríbete al boletín</h3>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="px-4 py-2 rounded-md text-secondary w-full"
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-green-600 transition text-white px-4 py-2 rounded-md"
            >
              Suscribirme
            </button>
          </form>
        </div>

        {/* Enlaces y redes */}
        <div className="flex flex-col sm:items-end gap-4">
          <div className="space-x-4">
            <Link href="/providers">Profesionales</Link>
            <Link href="#">Acerca de nosotros</Link>
            <Link href="#">Blog</Link>
          </div>
          <div className="flex space-x-4 mt-2 text-xl">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/20 pt-4 text-center text-sm">
        © {new Date().getFullYear()} Vitta. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;

  