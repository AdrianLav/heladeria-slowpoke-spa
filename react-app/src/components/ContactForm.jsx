import { useEffect, useRef, useState } from 'react'
import { validateContact } from '../lib/shop.js'
const initial = { name: '', email: '', subject: '', message: '' }
const fields = [
  ['name', 'Nombre', 'Tu nombre', 'text'], ['email', 'Correo electrónico', 'tu@correo.com', 'email'],
  ['subject', 'Asunto', '¿De qué se trata?', 'text'], ['message', 'Mensaje', 'Escribe aquí tu mensaje...', 'textarea'],
]
export default function ContactForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const timer = useRef()
  useEffect(() => () => clearTimeout(timer.current), [])
  function submit(event) {
    event.preventDefault()
    const next = validateContact(values)
    setErrors(next)
    if (Object.keys(next).length) return
    setSuccess(true); setValues(initial)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setSuccess(false), 5000)
  }
  return <form className="form-card" id="contactForm" noValidate onSubmit={submit}>
    <div className={`form-success ${success ? 'show' : ''}`} id="formSuccess" role="status">✅ ¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.</div>
    {fields.map(([name, label, placeholder, type]) => {
      const props = { id: name, name, placeholder, required: true, value: values[name], 'aria-invalid': !!errors[name], 'aria-describedby': `${name}-error`, onChange: e => {
        setValues(current => ({ ...current, [name]: e.target.value })); setErrors(current => ({ ...current, [name]: '' }))
      } }
      return <div key={name} className={`field ${errors[name] ? 'invalid' : ''}`}><label htmlFor={name}>{label}</label>
        {type === 'textarea' ? <textarea {...props} /> : <input {...props} type={type} />}
        <div className="error" id={`${name}-error`}>{errors[name]}</div>
      </div>
    })}
    <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Enviar mensaje</button>
  </form>
}
