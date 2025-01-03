import { Container } from '@/components/container'
import Link from 'next/link'

export function DashboardHeader() {
  return (
    <div className="bg-zinc-800 p-4">
      <Container>
        <header className="w-full bg-zinc-900 p-3 rounded flex gap-4 items-center">
          <Link
            href="/dashboard"
            className="text-white hover:font-bold duration:300"
          >
            Chamados
          </Link>
          <Link
            href="/dashboard/customer"
            className="text-white hover:font-bold duration:300"
          >
            Clientes
          </Link>
        </header>
      </Container>
    </div>
  )
}
