import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-[#FAFAFA] shadow-md py-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 rounded-[100px] bg-[#FAFAFA] drop-shadow-lg">
        {/* Logo + Marca */}
        <div className="flex items-center space-x-2">
          <Link href="/" passHref>
            <Image
              src="/logo-png-vitta2.png"
              alt="Logo Vitta"
              width={120}
              height={120}
              className="-my-2 cursor-pointer" // cursor para indicar clic
              priority
            />
          </Link>
        </div>

        {/* Links */}
        <nav className="space-x-10 text-md font-medium text-secondary">
          <Link href="/providers">Profesionales</Link>
          <Link href="#">Acerca de nosotros</Link>
          <Link href="#">Blog</Link>
        </nav>

        {/* Botón */}
        <Link href="/register">
        <button className="bg-primary border border-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition">
          Get started
        </button>
        </Link>
        
      </div>
    </header>
  );
};

export default Navbar;




