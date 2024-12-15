import Image from 'next/image'
import heroImg from '../assets/hero.png'

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center bg-zinc-800 min-h-[calc(100vh-80px)]">
      <h1 className="font-bold text-2xl mb-8 text-white md:text-3xl pt-4">
        Seja Master no Atendimento dos seus Clientes
      </h1>
      <Image
        src={heroImg}
        alt="Imagem hero do dev controle"
        width={500}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  )
}
