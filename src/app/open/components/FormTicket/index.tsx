'use client'
import { Input } from '@/components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/api'
import { CustomerDataInfo } from '../../page'

const schema = z.object({
  name: z.string().min(1, 'O nome do chamado é obrigatório'),
  description: z.string().min(1, 'Descreva um pouco sobre o seu problema...'),
})

type FormData = z.infer<typeof schema>

interface FormTicketProps {
  customer: CustomerDataInfo
}

export function FormTicket({ customer }: FormTicketProps) {
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
      customerId: customer.id,
    })

    setValue('name', '')
    setValue('description', '')
  }
  return (
    <form
      className="bg-zinc-900 py-6 px-4 rounded-lg mt-6 mb-20"
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <div className="mb-2">
        <label className="font-medium text-lg">Nome do chamado</label>
      </div>
      <Input
        register={register}
        type="text"
        placeholder="Digite o nome do chamado"
        name="name"
        error={errors.name?.message}
      />

      <div className="mb-2 mt-3">
        <label className="font-medium text-lg">Descreva o problema</label>
      </div>
      <textarea
        className="w-full rounded-md h-24 resize-none p-2 bg-zinc-600"
        placeholder="Descreva o seu problema"
        id="description"
        {...register('description')}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 pt-1">{errors.description?.message}</p>
      )}

      <button
        type="submit"
        className="bg-emerald-300 rounded text-black font-semibold text-md w-full h-11 mt-6"
      >
        Cadastrar
      </button>
    </form>
  )
}
