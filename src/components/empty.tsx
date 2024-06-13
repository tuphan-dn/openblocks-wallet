import { FolderSearch } from 'lucide-react'

export type EmptyProps = {
  message?: string
}

export default function Empty({ message = 'Empty' }: EmptyProps) {
  return (
    <span className="w-full opacity-60 flex flex-row gap-2 items-center justify-center">
      <FolderSearch className="w-6 h-6" />
      <p className="text-center text-xs">{message}</p>
    </span>
  )
}
