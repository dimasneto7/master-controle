import { Container } from '@/components/container'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { TicketItem } from './components/ticket'
import prismaClient from '@/lib/prisma'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  console.log(session)

  if (!session || !session.user) {
    redirect('/')
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
      status: 'ABERTO',
    },
    include: {
      customer: true,
    },
  })

  return (
    <div className="bg-zinc-800 min-h-[calc(100vh-80px)]">
      <Container>
        <main className="pt-7 pb-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Chamados</h1>
            <Link
              href="/dashboard/new"
              className="bg-emerald-300 px-4 py-1 rounded"
            >
              Abrir chamado
            </Link>
          </div>

          <table className="min-w-full my-2">
            <thead>
              <tr>
                <th className="font-medium text-left text-white pl-1">
                  CLIENTE
                </th>
                <th className="font-medium text-left text-white hidden sm:block">
                  CADASTRO
                </th>
                <th className="font-medium text-left text-white">STATUS</th>
                <th className="font-medium text-left text-white">#</th>
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((ticket) => (
                  <TicketItem
                    key={ticket.id}
                    customer={ticket.customer}
                    ticket={ticket}
                  />
                ))}
            </tbody>
          </table>

          {tickets.length === 0 && (
            <h1 className="text-white mt-11 px-2">
              Nenhum ticket aberto foi encontrado...
            </h1>
          )}
        </main>
      </Container>
    </div>
  )
}
