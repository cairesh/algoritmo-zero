import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Dashboard from "./pages/Dashboard"
import Aula from "./pages/Aula"
import Exercicio from "./pages/Exercicio"
import Home from "./pages/Home"
import RotaProtegida from "./components/RotaProtegida"
import Professor from "./pages/Professor"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/dashboard" element={
        <RotaProtegida><Dashboard /></RotaProtegida>
      } />
      
      <Route path="/professor" element={
        <RotaProtegida><Professor /></RotaProtegida>
      } />
      
      <Route path="/aula" element={
        <RotaProtegida><Aula /></RotaProtegida>
      } />

      <Route path="/exercicio" element={
        <RotaProtegida><Exercicio /></RotaProtegida>
      } />
    </Routes>
  )
}

export default App