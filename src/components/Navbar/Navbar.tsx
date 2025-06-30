'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, role } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();

    if (role === 'user') {
      const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN!;
      const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!;
      const returnTo = process.env.NEXT_PUBLIC_AUTH0_LOGOUT_REDIRECT ?? "http://localhost:3000";

      window.location.href = `https://${domain}/v2/logout?client_id=${clientId}&returnTo=${encodeURIComponent(returnTo)}`;
    } else {
      router.push("/login");
    }
  };

  return (
    <header className="bg-white shadow-sm py-2">
      <div className="max-w-screen-xl h-[60px] mx-auto flex items-center justify-between px-4 rounded-[100px] bg-white drop-shadow-lg">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo-png-vitta2.png"
            alt="Logo Vitta"
            width={80}
            height={80}
            className="-my-1 cursor-pointer"
            priority
          />
        </Link>

        <nav className="space-x-8 text-md font-medium text-secondary">
          <Link href="/providers">Profesionales</Link>
          <Link href="/about-us">Acerca de nosotros</Link>
          <Link href="/blog">Blog</Link>
        </nav>

        <div className="flex items-center space-x-2 relative">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-secondary px-4 py-2 rounded-full text-sm hover:text-secondary transition">
                Iniciar sesión
              </Link>

              <Link href="/register/provider">
                <button className="bg-tertiary border border-white text-secondary px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition">
                  Soy nutricionista
                </button>
              </Link>

              {isClient && (
                <a
                  href={`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`}
                  className="bg-primary border border-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition inline-block"
                >
                  Empieza aquí
                </a>
              )}
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setShowDropdown((prev) => !prev)}>
                <UserIcon className="w-6 h-6 text-secondary hover:text-primary" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">
                  <Link
                    href={role === 'provider' ? "/dashboard/provider" : "/dashboard/user"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mi perfil
                    <span className="block text-xs text-gray-400 mt-0.5">
                      {role === 'provider' ? 'Profesional' : 'Usuario'}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}

              {role === 'user' && (
                <Link href="/memberships">
                  <button className="ml-3 bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-secondary hover:text-white transition">
                    Acceder a membresía
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;














