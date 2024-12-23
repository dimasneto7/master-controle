import { FiTrash2, FiFile } from 'react-icons/fi'

export function TicketItem() {
  return (
    <>
      <tr className="border-b-2 border-b-zinc-700 h-16 last:border-b-0">
        <td className="text-left text-white pl-1">Mercado Silva</td>
        <td className="text-left hidden sm:table-cell text-white">01/04/24</td>
        <td className="text-left text-white">
          <span className="bg-green-500 px-2 py-1 rounded text-xs">ABERTO</span>
        </td>
        <td className="text-left">
          <button className="mr-2">
            <FiTrash2 size={24} color="#ef4444" />
          </button>
          <button>
            <FiFile size={22} color="#fff" />
          </button>
        </td>
      </tr>
    </>
  )
}
