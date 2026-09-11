import { Archive, Check, CircleHelp, Clock3, Inbox, LayoutGrid, Search, Tag, X } from 'lucide-react'
import { statusMeta } from '../../data/helpdeskData'
import { formatDate } from '../../utils/ticketHelpers'

const filters = [
  { id: 'all', label: 'Inicio / Todos', icon: LayoutGrid },
  { id: 'new', label: 'Bandeja de entrada', icon: Inbox },
  { id: 'progress', label: 'En progreso', icon: Clock3 },
  { id: 'completed', label: 'Completados', icon: Archive },
]

export default function ManagerLayout({ filter, setFilter, counts, search, setSearch, visibleTickets, selectedTicket, setSelectedId, activeTicket, startResolution, updateTicketStatus, notice }) {
  return (
    <main className="manager-page">
      <aside className="sidebar">
        <nav>{filters.map(({ id, label, icon: Icon }) => <button key={id} className={`nav-item ${filter === id ? 'active' : ''}`} onClick={() => { setFilter(id); setSelectedId(null) }}><Icon size={17} /><span>{label}</span><b>{counts[id]}</b></button>)}</nav>
      </aside>
      <section className="inbox-panel">
        <div className="manager-heading"><div><span className="section-kicker">ESPACIO DE TRABAJO</span><h1>{filter === 'all' ? 'Todas las incidencias' : filter === 'new' ? 'Bandeja de entrada' : filter === 'progress' ? 'En progreso' : 'Completados'}</h1><p>{filter === 'new' ? 'Ordenadas por prioridad y antigüedad.' : 'Gestiona y consulta el estado de tus solicitudes.'}</p></div><div className="manager-count">{visibleTickets.length}<span>tickets</span></div></div>
        <div className="search-field"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por título o número..." />{search && <button onClick={() => setSearch('')} aria-label="Limpiar búsqueda"><X size={15} /></button>}</div>
        {notice && <div className="manager-notice"><CircleHelp size={15} /> {notice}</div>}
        {filter === 'progress' && activeTicket ? <ProgressCard ticket={activeTicket} updateTicketStatus={updateTicketStatus} /> : <div className="ticket-list">{visibleTickets.length ? visibleTickets.map((ticket) => <TicketRow key={ticket.id} ticket={ticket} selected={selectedTicket?.id === ticket.id} onClick={() => setSelectedId(ticket.id)} />) : <EmptyState filter={filter} />}</div>}
      </section>
      {selectedTicket && filter !== 'progress' && <TicketDetail ticket={selectedTicket} activeTicket={activeTicket} close={() => setSelectedId(null)} startResolution={startResolution} />}
    </main>
  )
}

function TicketRow({ ticket, selected, onClick }) {
  const meta = statusMeta[ticket.status]
  return <button className={`ticket-row ${selected ? 'selected' : ''}`} onClick={onClick}><span className={`ticket-avatar ${meta.dot}`}>{ticket.title.slice(0, 1)}</span><span className="ticket-row-main"><span className="ticket-row-top"><strong>{ticket.title}</strong><small>{formatDate(ticket.createdAt)}</small></span><span className="ticket-row-bottom"><span>{ticket.id}</span><span className={`status-label ${meta.className}`}><i />{ticket.status}</span><span className="priority-label">{ticket.priority}</span></span></span></button>
}

function TicketDetail({ ticket, activeTicket, close, startResolution }) {
  const meta = statusMeta[ticket.status]
  return <aside className="detail-panel"><div className="detail-header"><span>DETALLE DE INCIDENCIA</span><button className="icon-button" onClick={close} aria-label="Cerrar detalle"><X size={18} /></button></div><div className="detail-content"><span className={`status-label ${meta.className}`}><i />{ticket.status}</span><h2>{ticket.title}</h2><div className="detail-id">{ticket.id} <span>•</span> Creado el {formatDate(ticket.createdAt)}</div><div className="detail-divider" /><div className="detail-field"><span>PRIORIDAD</span><strong className={`priority-text priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</strong></div><div className="detail-field"><span>DESCRIPCIÓN</span><p>{ticket.description}</p></div>{ticket.status === 'Nuevo' && <button className="primary-button full-button" onClick={() => startResolution(ticket)} disabled={Boolean(activeTicket)}><Clock3 size={16} /> {activeTicket ? `En progreso: ${activeTicket.id}` : 'Iniciar resolución'}</button>}{ticket.status === 'Completado' && <div className="read-only"><Check size={16} /> Incidencia resuelta · solo lectura</div>}</div></aside>
}

function ProgressCard({ ticket, updateTicketStatus }) {
  return <div className="active-resolution"><div className="active-label"><span className="pulse-dot" /> INCIDENCIA ACTIVA</div><span className="status-label status-progress"><i />En progreso</span><h2>{ticket.title}</h2><p>{ticket.description}</p><div className="active-meta"><span><Tag size={15} /> {ticket.id}</span><span><Clock3 size={15} /> Desde {formatDate(ticket.createdAt)}</span><span>Prioridad <strong>{ticket.priority}</strong></span></div><button className="complete-button" onClick={() => updateTicketStatus(ticket.id, 'Completado')}><Check size={17} /> Finalizar y completar</button></div>
}

function EmptyState({ filter }) {
  return <div className="empty-state"><Inbox size={31} /><h3>{filter === 'completed' ? 'Aún no hay incidencias completadas' : 'No encontramos incidencias'}</h3><p>Prueba con otro filtro o término de búsqueda.</p></div>
}
