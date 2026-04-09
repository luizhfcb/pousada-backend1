const roomTypeLabels = {
  simples: 'Refúgio Jardim',
  duplo: 'Varanda do Vale',
  suite: 'Suíte Serra',
}

const roomTypeNames = {
  simples: 'Simples',
  duplo: 'Duplo',
  suite: 'Suíte',
}

const reservationStatuses = {
  pendente: 'Pendente',
  confirmada: 'Confirmada',
  cancelada: 'Cancelada',
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

export function formatDate(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
}

export function getRoomTypeLabel(type) {
  return roomTypeLabels[type] || 'Hospedagem Especial'
}

export function getRoomTypeName(type) {
  return roomTypeNames[type] || 'Personalizado'
}

export function getStatusLabel(status) {
  return reservationStatuses[status] || status
}

export function buildRoomTitle(room) {
  return `${getRoomTypeLabel(room.tipo)} ${room.numero}`
}
