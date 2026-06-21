import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import api from "../services/api"

export default function Aula() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const moduloId = searchParams.get("modulo")

  const [modulo, setModulo] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    if (!moduloId) {
      setCarregando(false)
      return
    }

    api.get(`/modulos/${moduloId}`)
      .then((resposta) => setModulo(resposta.data))
      .catch((erro) => console.error("Erro ao buscar modulo:", erro))
      .finally(() => setCarregando(false))
  }, [moduloId])

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">

      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <nav className="border-b border-white/5 backdrop-blur-xl bg-white/3 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="font-black text-white">Algoritmo<span className="text-indigo-400">Zero</span></span>
        </div>
        <motion.button
          whileHover={{ x: -3 }}
          onClick={() => navigate("/dashboard")}
          className="text-gray-400 hover:text-white text-sm transition flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </motion.button>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-indigo-400 text-sm font-medium">
            {modulo ? modulo.titulo : "Modulo"}
          </span>
          <h1 className="text-3xl font-bold text-white mt-1 mb-2">
            {modulo ? modulo.descricao : "Conteudo da aula"}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 mb-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Introducao</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            {modulo
              ? modulo.descricao
              : "Conteudo da aula sera exibido aqui assim que cadastrado pelo professor."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/exercicio?modulo=${moduloId}`)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition flex items-center gap-2 shadow-lg shadow-indigo-500/30"
          >
            Ir para os exercicios
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>

      </div>
    </div>
  )
}