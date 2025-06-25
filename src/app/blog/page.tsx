'use client';

import Link from 'next/link';

const mockPosts = [
  {
    id: 1,
    title: "Tendencias en nutrición 2025: alimentación consciente y microbiota",
    excerpt:
      "Descubre por qué la salud intestinal, el ayuno intermitente personalizado y la nutrición basada en plantas siguen marcando la pauta este año.",
    author: "Dra. Camila Peralta",
    date: "Junio 2025",
  },
  {
    id: 2,
    title: "Nutrición y salud mental: la conexión cuerpo-mente",
    excerpt:
      "La ciencia ha confirmado lo que intuíamos: lo que comemos impacta directamente en nuestras emociones, energía y concentración.",
    author: "Lic. Martín Ríos",
    date: "Mayo 2025",
  },
  {
    id: 3,
    title: "Dieta antiinflamatoria: aliada en enfermedades crónicas",
    excerpt:
      "Cada vez más profesionales recomiendan este enfoque para pacientes con diabetes tipo 2, artritis, obesidad o síndrome metabólico.",
    author: "Dra. Laura Esquivel",
    date: "Abril 2025",
  },
];

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-tr from-green-50 to-white">
      {/* Fondo opcional con imagen - descomenta si tienes imagen en /public/bg-blog.jpg */}
      {/* <div className="absolute inset-0 bg-[url('/bg-blog.jpg')] bg-cover bg-center opacity-10 z-0" /> */}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 font-sans">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">Vitta al día - ConCiencia Nutricional</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transition transform hover:scale-[1.02]"
            >
              <div>
                <h2 className="text-xl font-semibold text-secondary mb-2">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {post.author} • {post.date}
              </div>
              <Link
                href="#"
                className="mt-4 inline-block text-sm text-primary font-semibold hover:underline"
              >
                Leer más →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}


