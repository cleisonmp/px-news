import Image from 'next/image'
import { ActiveLink } from './ActiveLink'
import { SignInButton } from './SignInButton'

export function Header() {
  return (
    <header className="h-20 border-b border-gray-800">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-8 min-w-[320px] h-20">
        <div className="flex gap-20">
          <Image src="/images/logo.svg" alt="" width={110} height={31} />
          <nav className="flex gap-8 h-20 ">
            <ActiveLink title="Home" href="/" />
            <ActiveLink title="Posts" href="/posts" />
          </nav>
        </div>
        <SignInButton />
      </div>
    </header>
  )
}
