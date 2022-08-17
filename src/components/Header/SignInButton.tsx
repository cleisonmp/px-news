import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SignInButton() {
  const isUserLoggedIn = false
  return (
    <button
      type="button"
      className="flex items-center justify-center bg-gray-600 text-white rounded-full h-12 p-4 gap-4 hover:brightness-125 transition-all"
    >
      <FaGithub
        className={isUserLoggedIn ? ' text-green-400' : 'text-yellow-500'}
      />
      {isUserLoggedIn ? 'jhondoegithubuser' : 'Sign in with GitHub'}
      {isUserLoggedIn && <FiX className="text-gray-500" />}
    </button>
  )
}
