import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import '../styles/login.css'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const navigate = useNavigate()

  // Mock login handler — replace with real API call later
  const handleLogin = async ({ username, password }) => {
    setServerError('')
    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock validation — replace with real endpoint
      if (username === 'admin' && password === 'admin123') {
        // TODO: Save token
        navigate('/dashboard')
      } else {
        setServerError('Usuario o contraseña incorrectos')
      }
    } catch {
      setServerError('Error de conexión. Intentá nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page" id="login-page">
      {/* Left branding panel */}
      <aside className="login-panel">
        <div className="login-panel__bg">
          <div className="login-panel__circle login-panel__circle--1"></div>
          <div className="login-panel__circle login-panel__circle--2"></div>
          <div className="login-panel__circle login-panel__circle--3"></div>
        </div>

        <div className="login-panel__content">
          <div className="login-panel__logo">
            <div className="login-panel__logo-icon">
              <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="26" cy="26" r="24" fill="#F97316" stroke="white" strokeWidth="2" opacity="0.9"/>
                <path d="M26 2 Q26 26 26 50" stroke="white" strokeWidth="1.8" fill="none" opacity="0.5"/>
                <path d="M2 26 Q26 26 50 26" stroke="white" strokeWidth="1.8" fill="none" opacity="0.5"/>
                <path d="M7 10 Q26 17 45 10" stroke="white" strokeWidth="1.4" fill="none" opacity="0.3"/>
                <path d="M7 42 Q26 35 45 42" stroke="white" strokeWidth="1.4" fill="none" opacity="0.3"/>
              </svg>
            </div>
            <span className="login-panel__logo-text">Youth Basketball League</span>
          </div>

          <p className="login-panel__tagline">
            Administrá equipos, jugadores y partidos desde un único lugar.
          </p>

          {/* Basketball illustration */}
          <div className="login-panel__illustration">
            <svg viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Court floor */}
              <rect x="20" y="140" width="260" height="80" rx="12" fill="white" opacity="0.06"/>
              <rect x="30" y="148" width="240" height="64" rx="8" fill="none" stroke="white" strokeWidth="1.5" opacity="0.12"/>
              {/* Center line */}
              <line x1="150" y1="148" x2="150" y2="212" stroke="white" strokeWidth="1.5" opacity="0.12"/>
              {/* Center circle */}
              <circle cx="150" cy="180" r="25" fill="none" stroke="white" strokeWidth="1.5" opacity="0.12"/>

              {/* Floating basketball */}
              <circle cx="150" cy="70" r="35" fill="#F97316" opacity="0.9">
                <animate attributeName="cy" values="70;58;70" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <path d="M150 35 Q150 70 150 105" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4">
                <animate attributeName="d" values="M150 35 Q150 70 150 105;M150 23 Q150 58 150 93;M150 35 Q150 70 150 105" dur="2.5s" repeatCount="indefinite"/>
              </path>
              <path d="M115 70 Q150 70 185 70" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4">
                <animate attributeName="d" values="M115 70 Q150 70 185 70;M115 58 Q150 58 185 58;M115 70 Q150 70 185 70" dur="2.5s" repeatCount="indefinite"/>
              </path>

              {/* Dashboard mockup card */}
              <rect x="60" y="115" width="180" height="95" rx="10" fill="white" opacity="0.12"/>
              <rect x="72" y="128" width="60" height="6" rx="3" fill="white" opacity="0.2"/>
              <rect x="72" y="142" width="40" height="4" rx="2" fill="white" opacity="0.12"/>
              {/* Stat bars */}
              <rect x="72" y="156" width="100" height="8" rx="4" fill="#F97316" opacity="0.3"/>
              <rect x="72" y="170" width="80" height="8" rx="4" fill="white" opacity="0.15"/>
              <rect x="72" y="184" width="120" height="8" rx="4" fill="#F97316" opacity="0.2"/>

              {/* Small floating icons */}
              <rect x="40" y="100" width="32" height="32" rx="8" fill="white" opacity="0.1">
                <animate attributeName="y" values="100;92;100" dur="3s" repeatCount="indefinite"/>
              </rect>
              <text x="50" y="121" fill="white" fontSize="14" opacity="0.5" textAnchor="middle">📊</text>

              <rect x="230" y="90" width="32" height="32" rx="8" fill="white" opacity="0.1">
                <animate attributeName="y" values="90;82;90" dur="3.5s" repeatCount="indefinite"/>
              </rect>
              <text x="246" y="111" fill="white" fontSize="14" opacity="0.5" textAnchor="middle">🏆</text>
            </svg>
          </div>
        </div>
      </aside>

      {/* Right form area */}
      <section className="login-form-area" aria-label="Formulario de inicio de sesión">
        <div className="login-form-area__bg-dot login-form-area__bg-dot--1"></div>
        <div className="login-form-area__bg-dot login-form-area__bg-dot--2"></div>
        <div className="login-form-area__bg-dot login-form-area__bg-dot--3"></div>
        <div className="login-form-area__bg-dot login-form-area__bg-dot--4"></div>

        <div className="login-form-card">
          <Link to="/" className="login-form__back" id="btn-back-home">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10H5M9 6l-4 4 4 4" />
            </svg>
            Volver al inicio
          </Link>

          <div className="login-form__header">
            <span className="login-form__badge">🔒 Panel Admin</span>
            <h1 className="login-form__title">Acceso de Administradores</h1>
            <p className="login-form__subtitle">Iniciá sesión para gestionar la liga.</p>
          </div>

          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            serverError={serverError}
          />
        </div>
      </section>
    </div>
  )
}

export default Login
