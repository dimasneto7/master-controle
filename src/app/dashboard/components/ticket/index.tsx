'use client'

import { useContext } from 'react'
import { CustomerProps } from '@/utils/customer.type'
import { TicketProps } from '@/utils/ticket.type'
import { FiCheckSquare, FiFile } from 'react-icons/fi'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { ModalContext } from '@/providers/modal'

interface TicketItemProps {
  ticket: TicketProps
  customer: CustomerProps | null
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter()

  const { handleModalVisible, setDetailTicket } = useContext(ModalContext)

  async function handleChangeStatus() {
    try {
      const response = await api.patch('api/ticket', {
        id: ticket.id,
      })

      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  function handleOpenModal() {
    handleModalVisible()
    setDetailTicket({
      customer: customer,
      ticket: ticket,
    })
  }
  return (
    <>
      <tr className="border-b-2 border-b-zinc-700 h-16 last:border-b-0">
        <td className="text-left text-white pl-1">{customer?.name}</td>
        <td className="text-left hidden sm:table-cell text-white">
          {ticket?.created_at?.toLocaleDateString('pt-br')}
        </td>
        <td className="text-left text-white">
          <span className="bg-green-500 px-2 py-1 rounded text-xs">
            {ticket?.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-2" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#fff" />
          </button>
          <button onClick={handleOpenModal}>
            <FiFile size={22} color="#fff" />
          </button>
        </td>
      </tr>
    </>
  )
}
