import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Container } from '@/components/container'
import Link from 'next/link'
import { NewCustomerForm } from '../components/form'

export default async function NewCustomer() {
  const session = await getServerSession(authOptions)

  console.log(session)

  if (!session || !session.user) {
    redirect('/')
  }
  return (
    <div className="bg-zinc-800 min-h-[calc(100vh-80px)]">
      <Container>
        <main className="flex flex-col pt-9 pb-2">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/customer"
              className="text-white bg-zinc-700 px-4 py-1 rounded"
            >
              Voltar
            </Link>
            <h1 className="text-3xl font-bold text-white">Novo Cliente</h1>
          </div>
          <NewCustomerForm userId={session.user.id} />
        </main>
      </Container>
    </div>
  )
}
