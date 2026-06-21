import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import api from "../services/api"

export default function Exercicio() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const moduloId = searchParams.get("modulo")

  const [exercicios, setExercicios] = useState([])
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [resposta, setResposta] = useState("")
  const [resultado, setResultado] = useState(null)
  const [dica, setDica] = useState(null)
  const [tentativas, setTentativas] = useState(0)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    if (!moduloId) {
      setCarregando(false)
      return
    }

    api.get(`/exercicios/modulo/${moduloId}`)
      .then((resposta) => setExercicios(resposta.data))
      .catch((erro) => console.error("Erro ao buscar exercicios:", erro))
      .finally(() => setCarregando(false))
  }, [moduloId])

  const exercicioAtual = exercicios[indiceAtual]

  async function verificar() {
    if (!resposta.trim() || !exercicioAtual) return

    setTentativas(t => t + 1)

    try {
      const resp = await api.post(`/exercicios/${exercicioAtual.id}/verificar`, {
        resposta: resposta,
      })

      if (resp.data.correto) {
        setResultado("acerto")
        setDica(null)
      } else {
        setResultado("erro")
        setDica(resp.data.dica)
      }
    } catch (erro) {
      console.error("Erro ao verificar resposta:", erro)
    }
  }

  function novaTentativa() {
    setResposta("")
    setResultado(null)
  }

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Carregando...</p>
      </div>
    )
  }

  if (!exercicioAtual) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Nenhum exercicio cadastrado para este modulo ainda.</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm transition"
        >
          Voltar ao Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">

      <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <nav className="border-b border-gray-800 bg-gray-900 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="font-black text-white">Algoritmo<span className="text-indigo-400">Zero</span></span>
        </div>
        <motion.button
          whileHover={{ x: -3 }}
          onClick={() => navigate(`/aula?modulo=${moduloId}`)}
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
            Exercicio {indiceAtual + 1} de {exercicios.length}
          </span>
          <h1 className="text-2xl font-bold text-white mt-1">Pratique o que aprendeu</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-gray-500 text-sm">Tentativas: {tentativas}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-white mb-3">Enunciado</h2>
          <p className="text-gray-300 leading-relaxed">{exercicioAtual.enunciado}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-white mb-3">Sua resposta</h2>
          <input
            type="text"
            value={resposta}
            onChange={(e) => { setResposta(e.target.value); setResultado(null) }}
            placeholder="Digite sua resposta aqui..."
            disabled={resultado === "acerto"}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50 placeholder-gray-600"
          />

          <AnimatePresence>
            {resultado === "acerto" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center gap-3"
              >
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="text-green-400 font-semibold">Resposta correta!</p>
                  <p className="text-green-300 text-sm">
                    Muito bem! Voce acertou em {tentativas} tentativa{tentativas > 1 ? "s" : ""}.
                  </p>
                </div>
              </motion.div>
            )}

            {resultado === "erro" && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">❌</span>
                  <p className="text-red-400 font-semibold">Resposta incorreta.</p>
                </div>
                {dica && (
                  <p className="text-gray-400 text-sm">
                    💡 Dica: <code className="text-indigo-300">{dica}</code>
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between"
        >
          <AnimatePresence>
            {resultado === "erro" && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={novaTentativa}
                className="border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-3 rounded-xl text-sm transition"
              >
                Tentar novamente
              </motion.button>
            )}
          </AnimatePresence>

          {resultado === "acerto" ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/dashboard")}
              className="bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition flex items-center gap-2 ml-auto"
            >
              Concluir modulo
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={verificar}
              disabled={!resposta.trim()}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl text-sm transition ml-auto"
            >
              Verificar resposta
            </motion.button>
          )}
        </motion.div>

      </div>
    </div>
  )
}