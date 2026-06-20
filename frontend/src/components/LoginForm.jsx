import { useState } from 'react'

const LoginForm = ({ onSubmit, isLoading, serverError }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es obligatorio'
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear field error on typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate single field on blur
    if (name === 'username' && !formData.username.trim()) {
      setErrors((prev) => ({ ...prev, username: 'El usuario es obligatorio' }))
    }
    if (name === 'password' && !formData.password) {
      setErrors((prev) => ({ ...prev, password: 'La contraseña es obligatoria' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setTouched({ username: true, password: true })
      return
    }

    onSubmit(formData)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate id="login-form">
      {/* General server error */}
      {serverError && (
        <div className="login-form__alert" role="alert" id="login-alert">
          <span className="login-form__alert-icon">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
          </span>
          <span className="login-form__alert-text">{serverError}</span>
        </div>
      )}

      {/* Username field */}
      <div className="login-form__group">
        <label className="login-form__label" htmlFor="login-username">
          Usuario
        </label>
        <div className="login-form__input-wrapper">
          <input
            id="login-username"
            type="text"
            name="username"
            className={`login-form__input ${errors.username ? 'login-form__input--error' : ''}`}
            placeholder="Ingresá tu usuario"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="username"
            disabled={isLoading}
          />
          <span className="login-form__input-icon">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM3 17.5c0-3.5 3.1-5.5 7-5.5s7 2 7 5.5" />
            </svg>
          </span>
        </div>
        {errors.username && touched.username && (
          <div className="login-form__error" id="error-username">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <span>{errors.username}</span>
          </div>
        )}
      </div>

      {/* Password field */}
      <div className="login-form__group">
        <label className="login-form__label" htmlFor="login-password">
          Contraseña
        </label>
        <div className="login-form__input-wrapper">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            className={`login-form__input login-form__input--password ${errors.password ? 'login-form__input--error' : ''}`}
            placeholder="Ingresá tu contraseña"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="current-password"
            disabled={isLoading}
          />
          <span className="login-form__input-icon">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="8" width="12" height="9" rx="2" />
              <path strokeLinecap="round" d="M7 8V6a3 3 0 016 0v2" />
            </svg>
          </span>
          <button
            type="button"
            className="login-form__toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            id="btn-toggle-password"
            tabIndex={-1}
          >
            {showPassword ? (
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 10C3.226 13.338 6.346 15.5 10 15.5c.97 0 1.907-.152 2.786-.436M5.432 5.432A9.1 9.1 0 0 1 10 4.5c3.654 0 6.774 2.162 8.066 5.5a10.523 10.523 0 0 1-2.834 3.997" />
                <path strokeLinecap="round" d="M2 2l16 16" />
                <path strokeLinecap="round" d="M8.288 8.288a2 2 0 0 0 2.83 2.83" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 4.5C6.346 4.5 3.226 6.662 1.934 10c1.292 3.338 4.412 5.5 8.066 5.5s6.774-2.162 8.066-5.5C16.774 6.662 13.654 4.5 10 4.5z" />
                <circle cx="10" cy="10" r="2.5" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && touched.password && (
          <div className="login-form__error" id="error-password">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <span>{errors.password}</span>
          </div>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="login-form__submit"
        disabled={isLoading}
        id="btn-login-submit"
      >
        {isLoading ? (
          <>
            <div className="login-form__spinner"></div>
            <span>Ingresando...</span>
          </>
        ) : (
          <span>Iniciar Sesión</span>
        )}
      </button>

      {/* Footer */}
      <div className="login-form__footer">
        <p className="login-form__footer-text">
          Panel exclusivo para administradores de la liga.
        </p>
      </div>
    </form>
  )
}

export default LoginForm
