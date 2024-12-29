'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/input'

import { FiSearch, FiX } from 'react-icons/fi'
import { FormTicket } from './components/FormTicket'
import { api } from '@/lib/api'

const schema = z.object({
  email: z
    .string()
    .email('Digite o email do cliente para localizar')
    .min(1, 'O campo de email é obrigatório'),
})

type FormData = z.infer<typeof schema>

interface CustomerDataInfo {
  id: string
  name: string
}
export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null)
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function handleCustomClear() {
    setCustomer(null)
    setValue('email', '')
  }

  async function handleSearchCustom(data: FormData) {
    const response = await api.get('/api/customer', {
      params: {
        email: data.email,
      },
    })

    if (response.data === null) {
      setError('email', {
        type: 'custom',
        message: 'Ops, cliente não encontrado',
      })
      return
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name,
    })
  }

  return (
    <div className="bg-zinc-800 min-h-[calc(100vh-80px)] text-white">
      <div className="w-full max-w-2xl mx-auto px-2">
        <h1 className="font-bold text-3xl pt-20 pb-5 flex justify-center">
          Abrir Chamado
        </h1>

        <main className="flex flex-col">
          {customer ? (
            <div className="bg-zinc-900 py-4 px-4 rounded-lg flex items-center justify-between">
              <p className="text-lg">
                <strong>Cliente selecionado:</strong> {customer.name}
              </p>
              <button
                className="h-11 px-3 flex items-center justify-center rounded"
                onClick={handleCustomClear}
              >
                <FiX size={18} color="#fff" />
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleSearchCustom)}
              className="bg-zinc-900 py-6 px-4 rounded-lg"
            >
              <div className="flex flex-col gap-3">
                <Input
                  type="text"
                  name="email"
                  placeholder="Digite o email do cliente..."
                  error={errors.email?.message}
                  register={register}
                />

                <button
                  type="submit"
                  className="flex justify-center items-center text-sm gap-2 bg-emerald-300 h-11 rounded text-black font-semibold"
                >
                  Procurar Clientes <FiSearch size={18} color="#000" />
                </button>
              </div>
            </form>
          )}

          {customer !== null && <FormTicket />}
        </main>
      </div>
    </div>
  )
}
