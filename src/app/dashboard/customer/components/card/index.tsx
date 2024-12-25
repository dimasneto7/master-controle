'use client'
import { CustomerProps } from '@/utils/customer.type'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter()

  async function handleDeleteCustomer() {
    try {
      const response = await api.delete('/api/customer', {
        params: {
          id: customer.id,
        },
      })

      console.log(response.data)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <article className="flex flex-col bg-zinc-700 p-2 rounded gap-5 my-5 hover:scale-105 duration-300">
      <h2 className="text-white">
        <a className="font-bold">Nome:</a> {customer.name}
      </h2>
      <p className="text-white">
        <a className="font-bold">Email:</a> {customer.email}
      </p>
      <p className="text-white">
        <a className="font-bold">Telefone:</a> {customer.phone}
      </p>
      <p className="text-white">
        <a className="font-bold">Endereço:</a> {customer.address}
      </p>
      <button
        className="bg-red-500 px-4 rounded text-white mt-2 self-start"
        onClick={handleDeleteCustomer}
      >
        Deletar
      </button>
    </article>
  )
}
