import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className=" bg-white shadow-sm py-2">
      <div className="max-w-screen-xl h-[60px] mx-auto flex items-center justify-between px-4 rounded-[100px] bg-white drop-shadow-lg">
        {/* Logo + Marca */}
        <div className="flex items-center space-x-2">
          <Link href="/" passHref>
            <Image
              src="/logo-png-vitta2.png"
              alt="Logo Vitta"
              width={80}
              height={80}
              className="-my-1 cursor-pointer" // cursor para indicar clic
              priority
            />
          </Link>
        </div>

        

        {/* Links */}
        <nav className="space-x-8 text-md font-medium text-secondary">
          <Link href="/providers">Profesionales</Link>
          <Link href="/about-us">Acerca de nosotros</Link>
          <Link href="blog">Blog</Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Link href="/login" className="  text-primary px-4 py-2 rounded-full text-bold text-sm hover:text-secondary transition">
          Iniciar sesión</Link>
          {/* Botón */}
          <Link href="/register/provider">
            <button className="bg-primary border border-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition">
            Soy nutricionista
            </button>
          </Link>
          <Link href="/register/user">
            <button className="bg-primary border border-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition">
            Empieza aquí
            </button>
          </Link>
        </div>
        
        
      </div>
    </header>
  );
};

export default Navbar;




