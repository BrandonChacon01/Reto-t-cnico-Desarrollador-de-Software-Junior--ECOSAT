import { ChevronDown, Clock3, Paperclip, Plus, Send } from 'lucide-react'

export default function HelpCenter({ questions, faqOpen, setFaqOpen, form, setForm, createTicket, notice }) {
  const valid = form.title.trim() && form.description.trim()

  return (
    <main className="help-page">
      <section className="faq-layout">
        <div className="section-intro">
          <span className="section-kicker">01 / RESPUESTAS</span>
          <h2>Preguntas<br /><span>frecuentes</span></h2>
          <p>Lo que más nos preguntan, explicado de forma sencilla.</p>
        </div>
        <div className="faq-list">
          {questions.map((faq, index) => (
            <div className={`faq-item ${faqOpen === index ? 'is-open' : ''}`} key={faq.question}>
              <button className="faq-question" onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}>
                <span className="faq-number">0{index + 1}</span>
                <span>{faq.question}</span>
                <ChevronDown size={18} />
              </button>
              {faqOpen === index && <div className="faq-answer"><p>{faq.answer}</p></div>}
            </div>
          ))}
        </div>
      </section>

      <section id="new-ticket" className="ticket-section">
        <div className="ticket-copy">
          <span className="section-kicker">02 / CONTACTO</span>
          <h2>¿No encuentras<br /><span>lo que buscas?</span></h2>
          <p>Abre una incidencia y nuestro equipo se pondrá con ello. Cuantos más detalles, mejor podremos ayudarte.</p>
          <div className="response-note"><Clock3 size={17} /><span><strong>Tiempo de respuesta</strong><br />Normalmente respondemos en menos de 4 horas.</span></div>
        </div>
        <form className="ticket-form" onSubmit={createTicket}>
          <div className="form-heading"><div className="form-icon"><Plus size={19} /></div><div><h3>Nueva incidencia</h3><p>Todos los campos marcados son necesarios.</p></div></div>
          <label>Título de la incidencia<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Ej. No puedo iniciar sesión" /></label>
          <label>Descripción<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Describe brevemente qué está ocurriendo..." rows="4" /></label>
          <label>Prioridad<select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}><option>Baja</option><option>Media</option><option>Alta</option></select></label>
          <div className="form-footer"><span className="attachment-hint"><Paperclip size={15} /> Puedes adjuntar archivos después</span><button className="primary-button" disabled={!valid} type="submit"><Send size={15} /> Enviar incidencia</button></div>
        </form>
      </section>
      {notice && <div className="toast">{notice}</div>}
    </main>
  )
}
