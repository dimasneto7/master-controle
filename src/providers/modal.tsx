'use client'

import { createContext, ReactNode, useState } from 'react'
import { TicketProps } from '@/utils/ticket.type'
import { CustomerProps } from '@/utils/customer.type'
import { ModalTicket } from '@/components/modal'
import { Customer } from '@prisma/client'

interface ModalContextData {
  visible: boolean
  handleModalVisible: () => void
  ticket: TickeInfo | undefined
  setDetailTicket: (detail: TickeInfo) => void
}

export const ModalContext = createContext({} as ModalContextData)

interface TickeInfo {
  ticket: TicketProps
  customer: CustomerProps | null
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false)
  const [ticket, setTicket] = useState<TickeInfo>()

  function handleModalVisible() {
    setVisible(!visible)
  }

  function setDetailTicket(detail: TickeInfo) {
    setTicket(detail)
  }

  return (
    <ModalContext.Provider
      value={{ visible, handleModalVisible, ticket, setDetailTicket }}
    >
      {visible && <ModalTicket />}
      {children}
    </ModalContext.Provider>
  )
}
