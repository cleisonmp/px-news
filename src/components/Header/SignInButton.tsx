import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { useSession, signIn, signOut } from 'next-auth/react'

export function SignInButton() {
  const { data: session } = useSession()

  return (
    <button
      onClick={() => signIn('github')}
      type="button"
      className="flex items-center justify-center bg-gray-600 text-white rounded-full h-12 p-4 gap-4 hover:brightness-125 transition-all"
    >
      <FaGithub className={session ? ' text-green-400' : 'text-yellow-500'} />
      {session ? session.user?.name : 'Sign in with GitHub'}
      {session && <FiX className="text-gray-500" />}
    </button>
  )
}
