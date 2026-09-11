import { priorityOrder } from '../data/helpdeskData'

export const formatDate = (date) => new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date(date))

export function filterTickets(tickets, filter, search) {
  const query = search.toLowerCase()
  let result = tickets.filter((ticket) => `${ticket.id} ${ticket.title} ${ticket.description}`.toLowerCase().includes(query))

  if (filter === 'new') {
    result = result
      .filter((ticket) => ticket.status === 'Nuevo')
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority] || new Date(a.createdAt) - new Date(b.createdAt))
    return result
  }

  if (filter === 'progress') result = result.filter((ticket) => ticket.status === 'En progreso')
  if (filter === 'completed') result = result.filter((ticket) => ticket.status === 'Completado')
  return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export function getTicketCounts(tickets) {
  return {
    all: tickets.length,
    new: tickets.filter((ticket) => ticket.status === 'Nuevo').length,
    progress: tickets.filter((ticket) => ticket.status === 'En progreso').length,
    completed: tickets.filter((ticket) => ticket.status === 'Completado').length,
  }
}
