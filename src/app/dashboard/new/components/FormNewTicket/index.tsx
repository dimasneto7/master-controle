'use client'

import Link from 'next/link'
import { z } from 'zod'
import { api } from '@/lib/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/input'

const schema = z.object({
  name: z.string().min(1, 'O nome do chamado é obrigatório'),
  description: z.string().min(1, 'Descreva um pouco sobre o seu problema...'),
  customerId: z.string().min(1, 'Selecione um cliente'),
})

type FormData = z.infer<typeof schema>

interface CustomerProps {
  id: string
  name: string
  phone: string
  email: string
  address: string | null
  userId: string | null
}

interface FormNewTicketProps {
  customers: CustomerProps[]
  userId: string
}

export function FormNewTicket({ customers, userId }: FormNewTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post('/api/ticket', {
      name: data.name,
      description: data.description,
      customerId: data.customerId,
      userId: userId,
    })

    setValue('name', '')
    setValue('description', '')
  }
  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label className="mb-1 font-medium text-lg mt-5">Nome do Chamado</label>
      <Input
        register={register}
        type="text"
        placeholder="Digite o nome do chamado"
        name="name"
        error={errors.name?.message}
      />

      <label className="mb-1 font-medium text-lg mt-5">
        Descreva o problema
      </label>
      <textarea
        className="w-full rounded-md h-24 resize-none p-2 bg-zinc-600"
        placeholder="Descreva o seu problema"
        id="description"
        {...register('description')}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 pt-1">{errors.description?.message}</p>
      )}

      {customers.length !== 0 && (
        <>
          <label className="mb-1 font-medium text-lg mt-5">
            Selecione o cliente
          </label>
          <select
            className="w-full border-0 rounded-md h-11 px-2 bg-zinc-700 resize-none"
            {...register('customerId')}
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {errors.customerId && (
            <p className="text-red-500 pt-1">{errors.customerId.message}</p>
          )}
        </>
      )}

      {customers.length === 0 && (
        <Link href="/dashboard/customer/new" className=" mt-5">
          Você ainda não possui nenhum cliente,{' '}
          <span className="font-medium underline">Cadastrar Cliente</span>
        </Link>
      )}

      <button
        type="submit"
        className="bg-emerald-300 my-5 px-2 h-11 rounded font-bold text-black disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={customers.length === 0}
      >
        Cadastrar
      </button>
    </form>
  )
}
