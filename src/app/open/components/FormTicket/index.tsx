'use client'
import { Input } from '@/components/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const schema = z.object({
  name: z.string().min(1, 'O nome do chamado é obrigatório'),
  description: z.string().min(1, 'Descreva um pouco sobre o seu problema...'),
})

type FormData = z.infer<typeof schema>

export function FormTicket() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  return (
    <form className="bg-zinc-900 py-6 px-4 rounded-lg mt-6">
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

      <div className="mb-2">
        <label className="font-medium text-lg">Descreva o problema</label>
      </div>
      <textarea
        className="w-full rounded-md h-24 resize-none mb-2 p-2 bg-zinc-600"
        placeholder="Descreva o seu problema"
        id="description"
        {...register('description')}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 my-1">{errors.description?.message}</p>
      )}

      <button
        type="submit"
        className="bg-emerald-300 rounded text-black font-semibold text-md w-full h-11"
      >
        Cadastrar
      </button>
    </form>
  )
}
