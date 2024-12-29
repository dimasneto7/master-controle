import { Container } from '@/components/container'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

import Link from 'next/link'
import { CardCustomer } from './components/card'
import prismaClient from '@/lib/prisma'

export default async function Customer() {
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
    <div className="bg-zinc-800 min-h-[calc(100vh-80px)]">
      <Container>
        <main className="pt-7 pb-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">Meus Clientes</h1>
            <Link
              href="/dashboard/customer/new"
              className="bg-emerald-300 px-4 py-1 rounded"
            >
              Novo Cliente
            </Link>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {customers.map((customer) => (
              <CardCustomer key={customer.id} customer={customer} />
            ))}
          </section>

          {customers.length === 0 && (
            <h1 className="text-white">Você ainda não possui nenhum cliente</h1>
          )}
        </main>
      </Container>
    </div>
  )
}
