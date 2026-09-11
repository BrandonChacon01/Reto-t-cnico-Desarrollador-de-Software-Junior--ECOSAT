import { X } from 'lucide-react'

export default function HelpModal({ screen, close }) {
  const isUser = screen === 'help'
  return <div className="help-overlay" role="dialog" aria-modal="true" aria-labelledby="help-title" onClick={close}>
    <div className="help-modal" onClick={(event) => event.stopPropagation()}>
      <button className="icon-button help-modal-close" onClick={close} aria-label="Cerrar ayuda"><X size={18} /></button>
      <span className="section-kicker">GUÍA RÁPIDA</span>
      <h2 id="help-title">Cómo usar esta página</h2>
      <p>{isUser ? 'Desde aquí puedes consultar respuestas y registrar una nueva solicitud de soporte.' : 'Desde aquí puedes revisar, priorizar y actualizar las incidencias recibidas.'}</p>
      <ol className="help-steps">
        {isUser ? <><li><span className="help-step-number">1</span><span><strong>Consulta las preguntas frecuentes.</strong><br />Abre cada pregunta para ver su respuesta.</span></li><li><span className="help-step-number">2</span><span><strong>Crea una incidencia.</strong><br />Completa título, descripción y prioridad.</span></li><li><span className="help-step-number">3</span><span><strong>Cambia a Desarrolladores.</strong><br />Usa el selector superior para consultar tus incidencias.</span></li></> : <><li><span className="help-step-number">1</span><span><strong>Elige una bandeja.</strong><br />Filtra todos, nuevos, en progreso o completados.</span></li><li><span className="help-step-number">2</span><span><strong>Abre una incidencia.</strong><br />Selecciona un ticket para ver su detalle.</span></li><li><span className="help-step-number">3</span><span><strong>Respeta el flujo.</strong><br />Solo puede haber una incidencia en progreso.</span></li></>}
      </ol>
    </div>
  </div>
}
