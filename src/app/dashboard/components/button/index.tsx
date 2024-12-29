'use client'
import { useRouter } from 'next/navigation'
import { FiRefreshCcw } from 'react-icons/fi'

export function ButtonRefresh() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.refresh()}
      className="bg-emerald-300 px-4 py-2 rounded"
    >
      <FiRefreshCcw size={18} color="#000" />
    </button>
  )
}
