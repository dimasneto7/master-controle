export function CardCustomer() {
  return (
    <article className="flex flex-col bg-zinc-700 p-2 rounded gap-5 my-5 hover:scale-105 duration-300">
      <h2 className="text-white">
        <a className="font-bold">Nome:</a> Mercado Silva
      </h2>
      <p className="text-white">
        <a className="font-bold">Email:</a> teste@teste.com
      </p>
      <p className="text-white">
        <a className="font-bold">Telefone:</a> (11) 98888-7777
      </p>
      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
        Deletar
      </button>
    </article>
  )
}
