import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import api from "../services/api"

function Particles() {
  const mesh = useRef()
  const count = 200

  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.03
      mesh.current.rotation.x = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  async function handleLogin(e) {
    e.preventDefault()
    setErro("")

    if (!email || !senha) {
      setErro("Preencha todos os campos.")
      return
    }

    setCarregando(true)

    try {
      const resposta = await api.post("/auth/login", {
        email: email,
        senha: senha,
      })

      localStorage.setItem("usuario", JSON.stringify(resposta.data.usuario))

      if (resposta.data.usuario.tipo === "professor") {
        navigate("/professor")
      } else {
        navigate("/dashboard")
      }

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErro("E-mail ou senha incorretos.")
      } else {
        setErro("Erro ao conectar com o servidor.")
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Fundo Three.js */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Particles />
        </Canvas>
      </div>

      {/* Gradiente por cima das partículas */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-950/80 via-gray-950/60 to-gray-950/90 pointer-events-none" />

      {/* Brilho central */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none z-10" />

      <div className="w-full max-w-md relative z-20">

        {/* Logo animado */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 mb-4 shadow-lg shadow-indigo-500/40 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Algoritmo<span className="text-indigo-400">Zero</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Aprenda logica de programacao do zero
          </p>
        </motion.div>

        {/* Card com glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50"
        >
          <h2 className="text-white text-xl font-semibold mb-6">Entrar na plataforma</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErro("") }}
                className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 placeholder-gray-600"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-400 text-sm">Senha</label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => { setSenha(e.target.value); setErro("") }}
                className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 placeholder-gray-600"
              />
            </div>

            {erro && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-red-400 text-sm">{erro}</span>
              </motion.div>
            )}

            <a href="#" className="text-indigo-400 text-xs text-right hover:underline transition">
              Esqueceu a senha?
            </a>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={carregando}
              className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200 mt-2 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30"
            >
              {carregando ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Entrando...
                </>
              ) : "Entrar"}
            </motion.button>

          </form>

          <p className="text-gray-500 text-sm text-center mt-6">
            Nao tem conta?{" "}
           <a href="/cadastro" className="text-indigo-400 hover:underline transition">
              Criar conta
            </a>
          </p>
        </motion.div>

      </div>
    </div>
  )
}