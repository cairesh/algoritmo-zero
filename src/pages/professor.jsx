import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import api from "../services/api"

export default function Professor() {
  const navigate = useNavigate()
  const usuario = JSON.parse(localStorage.getItem("usuario")) || { nome: "Visitante" }

  const [aba, setAba] = useState("modulos")
  const [modulos, setModulos] = useState([])

  // Formulário de módulo
  const [tituloModulo, setTituloModulo] = useState("")
  const [descricaoModulo, setDescricaoModulo] = useState("")
  const [iconeModulo, setIconeModulo] = useState("📦")
  const [mensagemModulo, setMensagemModulo] = useState("")

  // Formulário de exercício
  const [moduloSelecionado, setModuloSelecionado] = useState("")
  const [enunciado, setEnunciado] = useState("")
  const [gabarito, setGabarito] = useState("")
  const [dica, setDica] = useState("")
  const [mensagemExercicio, setMensagemExercicio] = useState("")

  useEffect(() => {
    carregarModulos()
  }, [])

  function carregarModulos() {
    api.get("/modulos/")
      .then((resposta) => setModulos(resposta.data))
      .catch((erro) => console.error(erro))
  }

  function handleLogout() {
    localStorage.removeItem("usuario")
    navigate("/")
  }

  async function criarModulo(e) {
    e.preventDefault()
    setMensagemModulo("")

    try {
      const resposta = await api.post("/modulos/", {
        titulo: tituloModulo,
        descricao: descricaoModulo,
        icone: iconeModulo,
        ordem: modulos.length + 1,
      })

      await api.put(`/modulos/${resposta.data.id}/publicar`)

      setMensagemModulo("Modulo criado e publicado com sucesso!")
      setTituloModulo("")
      setDescricaoModulo("")
      carregarModulos()
    } catch (erro) {
      setMensagemModulo("Erro ao criar modulo.")
    }
  }

  async function criarExercicio(e) {
    e.preventDefault()
    setMensagemExercicio("")

    if (!moduloSelecionado) {
      setMensagemExercicio("Selecione um modulo.")
      return
    }

    try {
      await api.post("/exercicios/", {
        enunciado: enunciado,
        gabarito: gabarito,
        dica: dica,
        ordem: 1,
        modulo_id: parseInt(moduloSelecionado),
      })

      setMensagemExercicio("Exercicio criado com sucesso!")
      setEnunciado("")
      setGabarito("")
      setDica("")
    } catch (erro) {
      setMensagemExercicio("Erro ao criar exercicio.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="font-black text-white">Algoritmo<span className="text-indigo-400">Zero</span></span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs px-2 py-1 rounded-full ml-2">
            Painel do Professor
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{usuario.nome}</span>
          <button onClick={handleLogout} className="text-gray-500 hover:text-white text-sm transition">
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-white mb-2">Gerenciar conteudo</h1>
        <p className="text-gray-400 mb-8">Crie modulos e exercicios para os estudantes.</p>

        {/* Abas */}
        <div className="flex gap-2 mb-8 border-b border-gray-800">
          <button
            onClick={() => setAba("modulos")}
            className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
              aba === "modulos"
                ? "text-indigo-400 border-indigo-400"
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            Criar modulo
          </button>
          <button
            onClick={() => setAba("exercicios")}
            className={`px-4 py-3 text-sm font-medium transition border-b-2 ${
              aba === "exercicios"
                ? "text-indigo-400 border-indigo-400"
                : "text-gray-500 border-transparent hover:text-gray-300"
            }`}
          >
            Criar exercicio
          </button>
        </div>

        {/* Aba módulos */}
        {aba === "modulos" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={criarModulo} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 mb-8">
              <h2 className="text-lg font-semibold text-white">Novo modulo</h2>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Titulo</label>
                <input
                  type="text"
                  value={tituloModulo}
                  onChange={(e) => setTituloModulo(e.target.value)}
                  placeholder="Ex: Estruturas de Repeticao"
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Descricao</label>
                <textarea
                  value={descricaoModulo}
                  onChange={(e) => setDescricaoModulo(e.target.value)}
                  placeholder="Breve descricao do que sera ensinado"
                  rows={3}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500 resize-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Icone (emoji)</label>
                <input
                  type="text"
                  value={iconeModulo}
                  onChange={(e) => setIconeModulo(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500 w-20"
                  maxLength={2}
                />
              </div>

              {mensagemModulo && (
                <p className={`text-sm ${mensagemModulo.includes("Erro") ? "text-red-400" : "text-green-400"}`}>
                  {mensagemModulo}
                </p>
              )}

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-3 text-sm transition"
              >
                Criar e publicar modulo
              </button>
            </form>

            {/* Lista de módulos existentes */}
            <h3 className="text-sm font-medium text-gray-400 mb-3">Modulos publicados ({modulos.length})</h3>
            <div className="flex flex-col gap-2">
              {modulos.map((m) => (
                <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                  <span className="text-xl">{m.icone}</span>
                  <span className="text-white text-sm">{m.titulo}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Aba exercícios */}
        {aba === "exercicios" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={criarExercicio} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-white">Novo exercicio</h2>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Modulo</label>
                <select
                  value={moduloSelecionado}
                  onChange={(e) => setModuloSelecionado(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  required
                >
                  <option value="">Selecione um modulo</option>
                  {modulos.map((m) => (
                    <option key={m.id} value={m.id}>{m.titulo}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Enunciado</label>
                <textarea
                  value={enunciado}
                  onChange={(e) => setEnunciado(e.target.value)}
                  placeholder="Descreva o que o estudante deve fazer"
                  rows={3}
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500 resize-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Gabarito (resposta correta)</label>
                <input
                  type="text"
                  value={gabarito}
                  onChange={(e) => setGabarito(e.target.value)}
                  placeholder="Ex: para i de 1 ate 10 faca"
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm font-mono outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 text-sm">Dica (opcional)</label>
                <input
                  type="text"
                  value={dica}
                  onChange={(e) => setDica(e.target.value)}
                  placeholder="Dica exibida caso o estudante erre"
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
              </div>

              {mensagemExercicio && (
                <p className={`text-sm ${mensagemExercicio.includes("Erro") || mensagemExercicio.includes("Selecione") ? "text-red-400" : "text-green-400"}`}>
                  {mensagemExercicio}
                </p>
              )}

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg py-3 text-sm transition"
              >
                Criar exercicio
              </button>
            </form>
          </motion.div>
        )}

      </div>
    </div>
  )
}