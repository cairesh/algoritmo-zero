import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import api from "../services/api"

export default function Dashboard() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem("usuario")) || { nome: "Visitante" }
  const [modulos, setModulos] = useState([])

  useEffect(() => {
    api.get("/modulos/")
      .then((resposta) => setModulos(resposta.data))
      .catch((erro) => console.error("Erro ao buscar modulos:", erro))
  }, [])

  function handleLogout() {
    localStorage.removeItem("usuario")
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">

      {/* Brilhos de fundo */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="border-b border-white/5 backdrop-blur-xl bg-white/3 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="font-black text-white">Algoritmo<span className="text-indigo-400">Zero</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold">
              {usuario.nome?.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-400 text-sm">{usuario.nome}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-white text-sm transition"
            type="button"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10 relative z-10">

        {/* Boas vindas */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold text-white mb-1">Ola, {usuario.nome} 👋</h1>
          <p className="text-gray-400">Continue de onde parou e avance nos modulos.</p>
        </motion.div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Modulos concluidos", valor: "2/5", cor: "text-white" },
            { label: "Exercicios feitos", valor: "18", cor: "text-indigo-400" },
            { label: "Taxa de acerto", valor: "84%", cor: "text-green-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 cursor-default"
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.cor}`}>{stat.valor}</p>
            </motion.div>
          ))}
        </div>

        {/* Módulos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4">Modulos de aprendizado</h2>

          {modulos.length === 0 ? (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-gray-400">Nenhum modulo publicado ainda.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {modulos.map((modulo, i) => (
                <motion.div
                  key={modulo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  onClick={() => navigate(`/aula?modulo=${modulo.id}`)}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 rounded-2xl p-5 flex items-center justify-between cursor-pointer transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-indigo-600/20 flex items-center justify-center text-2xl transition-colors duration-200">
                      {modulo.icone}
                    </div>
                    <div>
                      <p className="text-white font-medium">{modulo.titulo}</p>
                      <p className="text-gray-500 text-sm mt-1">{modulo.descricao}</p>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  )
}