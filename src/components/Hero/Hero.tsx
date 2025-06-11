import Image from "next/image";

const Hero = () => {
  return (
    <section className="bg-[#FAFAFA] py-20">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Texto */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Tu bienestar empieza <br /> con un buen profesional
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-8">
            Encuentra psicólogos, terapeutas y coaches verificados para acompañarte en tu camino.
          </p>
          <button className="bg-primary text-white px-6 py-3 rounded-full text-sm hover:bg-secondary transition">
            Explorar profesionales
          </button>
        </div>

        {/* Imagen */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/hero-image.png" // cambia esta ruta si tu imagen tiene otro nombre
            alt="Ilustración Vitta"
            width={400}
            height={400}
            className="w-auto h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
