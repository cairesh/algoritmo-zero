import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"

function Particles() {
  const mesh = useRef()
  const count = 300

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.02
      mesh.current.rotation.x = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#6366f1" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

const recursos = [
  { icone: "📚", titulo: "Conteudo teorico", desc: "Modulos completos de logica de programacao com exemplos praticos e didaticos." },
  { icone: "⚡", titulo: "Exercicios interativos", desc: "Pratique com exercicios corrigidos automaticamente e receba feedback imediato." },
  { icone: "📊", titulo: "Acompanhe seu progresso", desc: "Visualize seu desempenho e historico de atividades em tempo real." },
  { icone: "🎯", titulo: "Do zero ao avancado", desc: "Comece do absoluto zero e evolua no seu proprio ritmo, sem pressa." },
]

const modulos = [
  { icone: "📦", titulo: "Variaveis e Tipos", nivel: "Iniciante" },
  { icone: "🔀", titulo: "Condicionais", nivel: "Iniciante" },
  { icone: "🔁", titulo: "Loops e Repeticao", nivel: "Intermediario" },
  { icone: "⚡", titulo: "Funcoes", nivel: "Intermediario" },
  { icone: "📊", titulo: "Vetores e Matrizes", nivel: "Avancado" },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-950 text-white min-h-screen overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-gray-950/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="font-black text-white">Algoritmo<span className="text-indigo-400">Zero</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-400 hover:text-white text-sm transition px-4 py-2"
          >
            Entrar
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-500/20"
          >
            Comecar agora
          </motion.button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">

        {/* Three.js fundo */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Particles />
          </Canvas>
        </div>

        {/* Gradientes */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-950/50 via-transparent to-gray-950 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="relative z-20 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
              Plataforma gratuita de ensino
            </span>

            <h1 className="text-6xl font-black text-white leading-tight mb-6">
              Aprenda{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                logica de programacao
              </span>{" "}
              do zero
            </h1>

            <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              O Algoritmo Zero e uma plataforma web gratuita que une teoria, pratica e
              feedback automatico para tornar o aprendizado de algoritmos mais acessivel.
            </p>

            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/login")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl text-base transition shadow-2xl shadow-indigo-500/30 flex items-center gap-2"
              >
                Comecar gratuitamente
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("modulos").scrollIntoView({ behavior: "smooth" })}
                className="border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition backdrop-blur-xl bg-white/5"
              >
                Ver modulos
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center justify-center gap-12 mt-20"
          >
            {[
              { valor: "5", label: "Modulos" },
              { valor: "30+", label: "Exercicios" },
              { valor: "100%", label: "Gratuito" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-white">{stat.valor}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recursos */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-white mb-4">Tudo que voce precisa</h2>
          <p className="text-gray-400 text-lg">Uma plataforma completa para iniciantes em programacao.</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {recursos.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gray-900 border border-gray-800 hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-200"
            >
              <span className="text-3xl mb-4 block">{r.icone}</span>
              <h3 className="text-white font-semibold text-lg mb-2">{r.titulo}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Módulos */}
      <section id="modulos" className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-white mb-4">Modulos disponíveis</h2>
          <p className="text-gray-400 text-lg">Do basico ao avancado, no seu proprio ritmo.</p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {modulos.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.01, x: 6 }}
              className="bg-gray-900 border border-gray-800 hover:border-indigo-500/30 rounded-2xl p-5 flex items-center justify-between transition-all duration-200 cursor-pointer group"
              onClick={() => navigate("/login")}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-800 group-hover:bg-indigo-600/20 flex items-center justify-center text-2xl transition-colors">
                  {m.icone}
                </div>
                <div>
                  <p className="text-white font-medium">{m.titulo}</p>
                  <p className="text-gray-500 text-sm">{m.nivel}</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 py-24 relative">
        <div className="absolute inset-0 bg-indigo-600/5 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl font-black text-white mb-4">
            Pronto para comecar?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Crie sua conta gratuitamente e comece a aprender logica de programacao hoje.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-xl text-base transition shadow-2xl shadow-indigo-500/30"
          >
            Comecar agora — e gratuito
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="font-black text-white text-sm">Algoritmo<span className="text-indigo-400">Zero</span></span>
        </div>
        <p className="text-gray-600 text-sm">Plataforma gratuita de ensino de logica de programacao</p>
      </footer>

    </div>
  )
}