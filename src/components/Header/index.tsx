import Image from 'next/image'
import { SignInButton } from './SignInButton'

export function Header() {
  return (
    <header className="h-20 border-b border-gray-800">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-8 min-w-[320px] h-20">
        <div className="flex gap-20">
          <Image src="/images/logo.svg" alt="" width={110} height={31} />
          <nav className="flex gap-8 h-20 ">
            <a
              href="#"
              className="flex flex-col justify-between text-gray-300 hover:text-white transition-colors"
            >
              <span className="flex flex-1 items-center">Home</span>
              <span className="border-2 rounded-t border-yellow-600" />
            </a>
            <a
              href="#"
              className="flex flex-col justify-between text-gray-300 hover:text-white transition-colors"
            >
              <span className="flex flex-1 items-center">Posts</span>
              <span className="border-2 rounded-t border-yellow-600" />
            </a>
          </nav>
        </div>
        <SignInButton />
      </div>
    </header>
  )
}
