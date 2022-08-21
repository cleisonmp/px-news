import Link from 'next/link'
import { useRouter } from 'next/router'
interface ActiveLinkProps {
  href: string
  title: string
}

export const ActiveLink = ({ href, title }: ActiveLinkProps) => {
  const isLinkActive = useRouter().asPath === href

  return (
    <Link href={href}>
      <a className="flex flex-col justify-between text-gray-300 hover:text-white transition-colors active:">
        <span className="flex flex-1 items-center">{title}</span>
        <span
          className={`rounded-t border-yellow-600 ${
            isLinkActive ? 'border-2' : 'border-0'
          }`}
        />
      </a>
    </Link>
  )
}
