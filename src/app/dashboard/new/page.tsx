import { Container } from '@/components/container'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import prismaClient from '@/lib/prisma'
import { FormNewTicket } from './components/FormNewTicket'

export default async function NewTicket() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/')
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return (
    <div className="bg-zinc-800 min-h-[calc(100vh-80px)] text-white">
      <Container>
        <main className="flex flex-col pt-9 pb-2">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-white bg-zinc-700 px-4 py-1 rounded"
            >
              Voltar
            </Link>
            <h1 className="text-3xl font-bold">Novo Chamado</h1>
          </div>

          <FormNewTicket customers={customers} userId={session.user.id} />
        </main>
      </Container>
    </div>
  )
}

// import { Container } from '@/components/container'
// import Link from 'next/link'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { redirect } from 'next/navigation'
// import prismaClient from '@/lib/prisma'

// export default async function NewTicket() {
//   const session = await getServerSession(authOptions)

//   if (!session || !session.user) {
//     redirect('/')
//   }

//   const customers = await prismaClient.customer.findMany({
//     where: {
//       userId: session.user.id,
//     },
//   })

//   async function handleRegisterTicket(formData: FormData) {
//     'use server'

//     const name = formData.get('name')
//     const description = formData.get('description')
//     const customerId = formData.get('customer')

//     if (!name || !description || !customerId) {
//       return
//     }

//     await prismaClient.ticket.create({
//       data: {
//         name: name as string,
//         description: description as string,
//         customerId: customerId as string,
//         status: 'ABERTO',
//         userId: session?.user.id,
//       },
//     })

//     redirect('/dashboard')
//   }

//   return (
//     <div className="bg-zinc-800 min-h-[calc(100vh-80px)] text-white">
//       <Container>
//         <main className="flex flex-col pt-9 pb-2">
//           <div className="flex items-center gap-3">
//             <Link
//               href="/dashboard"
//               className="text-white bg-zinc-700 px-4 py-1 rounded"
//             >
//               Voltar
//             </Link>
//             <h1 className="text-3xl font-bold">Novo Chamado</h1>
//           </div>

//           <form className="flex flex-col mt-6" action={handleRegisterTicket}>
//             <label className="mb-1 font-medium text-lg mt-5">
//               Nome do Chamado
//             </label>
//             <input
//               className="w-full border-0 rounded-md h-11 px-2 bg-zinc-700 text-white"
//               type="text"
//               placeholder="Digite o nome do chamado"
//               required
//               name="name"
//             />

//             <label className="mb-1 font-medium text-lg  mt-5">
//               Descreva o problema
//             </label>
//             <textarea
//               className="w-full border-0 rounded-md h-24 px-2 bg-zinc-700 resize-none"
//               placeholder="Descreva o problema..."
//               required
//               name="description"
//             ></textarea>

//             {customers.length !== 0 && (
//               <>
//                 <label className="mb-1 font-medium text-lg mt-5">
//                   Selecione o cliente
//                 </label>
//                 <select
//                   className="w-full border-0 rounded-md h-11 px-2 bg-zinc-700 resize-none"
//                   name="customer"
//                 >
//                   {customers.map((customer) => (
//                     <option key={customer.id} className="" value={customer.id}>
//                       {customer.name}
//                     </option>
//                   ))}
//                 </select>
//               </>
//             )}

//             {customers.length === 0 && (
//               <Link href="/dashboard/customer/new" className=" mt-5">
//                 Você ainda não possui nenhum cliente,{' '}
//                 <span className="font-medium underline">Cadastrar Cliente</span>
//               </Link>
//             )}

//             <button
//               type="submit"
//               className="bg-emerald-300 my-5 px-2 h-11 rounded font-bold text-black disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={customers.length === 0}
//             >
//               Cadastrar
//             </button>
//           </form>
//         </main>
//       </Container>
//     </div>
//   )
// }
