import Image from 'next/image'
import { NextProgressbarSpinner } from 'nextjs-progressbar-spinner'
import { ActiveLink } from './ActiveLink'
import { SignInButton } from './SignInButton'

export function Header() {
  return (
    <header className="h-20 border-b border-gray-800">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-8 min-w-[320px] h-20 gap-20">
        <div className="flex items-center gap-6">
          <Image src="/images/logo.svg" alt="" width={110} height={31} />
          <div className="flex w-8 h-8 items-center">
            <NextProgressbarSpinner
              NextNProgressProps={{
                color: '#61DCFB',
              }}
              spinnerType="PuffLoader"
              spinnerProps={{
                size: '2rem',
                color: '#61DCFB',
              }}
            />
          </div>
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
