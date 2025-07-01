import Hero from "@/components/Hero/Hero";
import Image from 'next/image';
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

export default async function Home() {

  // Valida si hay una sesion activa 
   const session = await auth0.getSession();


   if (session) {
    redirect("/dashboard/user"); // Si no hay sesión, envía al home
  }

  return (
    <main>
      <div>
        <Hero />
      </div>
      {/*----CONSULTAS MAS FRECUENTES----*/}
      <h1 className="title1">Consultas más frecuentes</h1>
      <section className="grid-cols-3 flex justify-center gap-10 mb-7">
        {/*CARD 1*/}
        <div className="bg-white rounded-xl p-4 w-[350px] h-auto">
          <Image
            src="/foto-consulta1.jfif"
            alt="Consulta virtual"
            width={400}
            height={400}
            className="rounded-xl object-cover"
            priority
          />
          <h2 className="title2">Obesidad</h2>
          <p className="text-gray-600 text-sm mb-4 px-2 py-1">La obesidad es una condición médica caracterizada por la acumulación excesiva de grasa corporal que puede ser perjudicial para la salud. Se considera un factor de riesgo para diversas enfermedades crónicas. </p>
        </div>
        {/*CARD 2*/}
        <div className="bg-white rounded-xl p-4 w-[350px] h-auto">
          <Image
            src="/foto-consulta2.jfif"
            alt="Consulta virtual"
            width={400}
            height={400}
            className="rounded-xl object-cover"
            priority
          />
          <h2 className="title2">Trastornos alimenticios</h2>
          <p className="text-gray-600 text-sm mb-4 px-2 py-1">Los trastornos de la conducta alimentaria (TCA) son enfermedades psiquiátricas complejas, multicausadas, que afectan principalmente a adolescentes y mujeres jóvenes.</p>
        </div>
        {/*CARD 3*/}
        <div className="bg-white rounded-xl p-4 w-[350px] h-auto">
          <Image
            src="/foto-consulta3.jfif"
            alt="Consulta virtual"
            width={400}
            height={400}
            className="rounded-xl object-cover"
            priority
          />
          <h2 className="title2">Diabetes</h2>
          <p className="text-gray-600 text-sm mb-4 px-2 py-1">La diabetes es una enfermedad crónica en la que el cuerpo no puede regular adecuadamente los niveles de glucosa en la sangre, lo que puede provocar daños en órganos y sistemas del cuerpo.</p>
        </div>
      </section>


      {/*----PROFESIONALES MAS FRECUENTES----*/}
      <h1 className="title1">Profesionales más populares</h1>
      <section className="grid-cols-3 flex justify-center gap-10 mb-7">
        {/*CARD 1*/}
        <div className="bg-white p-4 w-[300px] h-auto">
          <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
            <Image
              src="/FotoPerfilProvider.jpg"
              alt="Consulta virtual"
              width={300}
              height={300}
              className="w-full h-full object-cover" 
              priority
            />
          </div>
        <h2 className="title2 text-center">Pepita Flores</h2>
        <p className="text-gray-600 text-center text-sm mb-4 px-2 py-1">Ver mas...</p>
      </div>
      {/*CARD 2*/}
        <div className="bg-white p-4 w-[300px] h-auto">
          <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
            <Image
              src="/FotoPerfilProvider2.jpg"
              alt="Consulta virtual"
              width={300}
              height={300}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        <h2 className="title2 text-center">Pepita Flores</h2>
        <p className="text-gray-600 text-center text-sm mb-4 px-2 py-1">Ver mas...</p>
      </div>
      {/*CARD 3*/}
        <div className="bg-white p-4 w-[300px] h-auto">
          <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
            <Image
              src="/FotoPerfilProvider3.jpg"
              alt="Consulta virtual"
              width={300}
              height={300}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        <h2 className="title2 text-center">Pepita Flores</h2>
        <p className="text-gray-600 text-center text-sm mb-4 px-2 py-1">Ver mas...</p>
      </div>
      </section>

      {/*----RESEÑAS----*/}
      <h1 className="title1">Reseñas</h1>
    </main>
  );
}

