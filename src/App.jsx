import { useEffect, useMemo, useState } from 'react'
import { CircleHelp, Menu } from 'lucide-react'
import HelpCenter from './components/help/HelpCenter'
import HelpModal from './components/common/HelpModal'
import ManagerLayout from './components/management/ManagerLayout'
import { faqs, seedTickets, STORAGE_KEY } from './data/helpdeskData'
import { filterTickets, getTicketCounts } from './utils/ticketHelpers'
import './App.css'
import './overrides.css'

function App() {
  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : seedTickets
  })
  const [screen, setScreen] = useState('help')
  const [filter, setFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [faqOpen, setFaqOpen] = useState(0)
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')
  const [helpOpen, setHelpOpen] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', priority: 'Media' })

  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets)), [tickets])

  const activeTicket = tickets.find((ticket) => ticket.status === 'En progreso')
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId)
  const counts = getTicketCounts(tickets)
  const visibleTickets = useMemo(() => filterTickets(tickets, filter, search), [filter, search, tickets])

  const updateTicketStatus = (id, status) => {
    setTickets((current) => current.map((ticket) => ticket.id === id ? { ...ticket, status } : ticket))
    setNotice(status === 'En progreso' ? 'Incidencia iniciada correctamente.' : 'Incidencia marcada como completada.')
  }

  const startResolution = (ticket) => {
    if (activeTicket && activeTicket.id !== ticket.id) {
      setNotice(`Ya hay una incidencia en progreso (${activeTicket.id}). Finalízala antes de iniciar otra.`)
      return
    }
    updateTicketStatus(ticket.id, 'En progreso')
    setSelectedId(ticket.id)
  }

  const createTicket = (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.description.trim()) return
    const nextTicket = {
      id: `INC-${1050 + tickets.length}`,
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      status: 'Nuevo',
      createdAt: new Date().toISOString(),
    }
    setTickets((current) => [nextTicket, ...current])
    setForm({ title: '', description: '', priority: 'Media' })
    setNotice('Ticket creado. El equipo lo revisará pronto.')
  }

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand-mark">Helpdesk</div>
      <div className="topbar-context"><span className="context-line" /> <span>{screen === 'help' ? 'Parte del usuario' : 'Parte de desarrolladores'}</span></div>
      <div className="mode-switch" aria-label="Cambiar sección"><button className={screen === 'help' ? 'selected' : ''} onClick={() => setScreen('help')}>Usuario</button><button className={screen === 'manage' ? 'selected' : ''} onClick={() => setScreen('manage')}>Desarrolladores</button></div>
      <div className="topbar-actions"><button className="icon-button mobile-menu" aria-label="Abrir menú"><Menu size={19} /></button><button className="icon-button" aria-label="Cómo usar esta página" onClick={() => setHelpOpen(true)}><CircleHelp size={18} /></button><div className="avatar">AM</div></div>
    </header>
    {screen === 'help' ? <HelpCenter questions={faqs} faqOpen={faqOpen} setFaqOpen={setFaqOpen} form={form} setForm={setForm} createTicket={createTicket} notice={notice} /> : <ManagerLayout filter={filter} setFilter={setFilter} counts={counts} search={search} setSearch={setSearch} visibleTickets={visibleTickets} selectedTicket={selectedTicket} setSelectedId={setSelectedId} activeTicket={activeTicket} startResolution={startResolution} updateTicketStatus={updateTicketStatus} notice={notice} />}
    {helpOpen && <HelpModal screen={screen} close={() => setHelpOpen(false)} />}
  </div>
}

export default App
