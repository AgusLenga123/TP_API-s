import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TeamsPage from './pages/TeamsPage'
import PlayersPage from './pages/PlayersPage'
import MatchesPage from './pages/MatchesPage'
import ResultsPage from './pages/ResultsPage'
import StandingsPage from './pages/StandingsPage'
import PublicMatchesPage from './pages/PublicMatchesPage'
import PublicTeamsPage from './pages/PublicTeamsPage'
import PublicTeamDetailPage from './pages/PublicTeamDetailPage'
import ConfettiBackground from './components/ConfettiBackground'
import './App.css'

function App() {
  return (
    <Router>
      <ConfettiBackground />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clasificacion" element={<StandingsPage />} />
        <Route path="/partidos" element={<PublicMatchesPage />} />
        <Route path="/equipos" element={<PublicTeamsPage />} />
        <Route path="/equipos/:id" element={<PublicTeamDetailPage />} />
        
        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/equipos" element={<TeamsPage />} />
        <Route path="/admin/jugadores" element={<PlayersPage />} />
        <Route path="/admin/partidos" element={<MatchesPage />} />
        <Route path="/admin/resultados" element={<ResultsPage />} />
      </Routes>
    </Router>
  )
}

export default App
