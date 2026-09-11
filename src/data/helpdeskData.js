export const STORAGE_KEY = 'helpdesk-tickets'

export const seedTickets = [
  { id: 'INC-1048', title: 'No puedo acceder a mi cuenta', description: 'El enlace de acceso devuelve un error después de introducir mis credenciales.', priority: 'Alta', status: 'Nuevo', createdAt: '2026-09-07T08:30:00' },
  { id: 'INC-1047', title: 'Error al exportar reporte mensual', description: 'La exportación se queda cargando y no se descarga el archivo CSV.', priority: 'Media', status: 'En progreso', createdAt: '2026-09-06T14:15:00' },
  { id: 'INC-1046', title: 'Actualizar datos de facturación', description: 'Necesito actualizar la dirección fiscal asociada a mi organización.', priority: 'Baja', status: 'Completado', createdAt: '2026-09-04T11:05:00' },
]

export const faqs = [
  { question: '¿Cómo restablezco mi contraseña?', answer: 'Selecciona “¿Olvidaste tu contraseña?” en la pantalla de acceso. Recibirás un enlace de recuperación en tu correo registrado.' },
  { question: '¿Dónde puedo consultar mis facturas?', answer: 'Ve a Configuración y abre la sección Facturación. Allí encontrarás tus facturas y métodos de pago.' },
  { question: '¿Cuánto tarda en resolverse una incidencia?', answer: 'El tiempo depende de la prioridad. Las incidencias altas se atienden el mismo día laborable; las medias y bajas se revisan en un máximo de 48 horas.' },
  { question: '¿Puedo cambiar la prioridad de un ticket?', answer: 'Sí. Añade un comentario en el ticket explicando el impacto y nuestro equipo ajustará la prioridad si es necesario.' },
]

export const priorityOrder = { Alta: 0, Media: 1, Baja: 2 }
export const statusMeta = {
  Nuevo: { className: 'status-new', dot: 'new-dot' },
  'En progreso': { className: 'status-progress', dot: 'progress-dot' },
  Completado: { className: 'status-complete', dot: 'complete-dot' },
}
