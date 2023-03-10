import { signIn } from "next-auth/react"
import GithubIcon from "../icons/GithubIcon"

export default function SignInButtonGithub() {
  return (
    <button onClick={() => signIn('github')} className='btn btn-primary gap-2'>
      <GithubIcon className='w-6 h-6' />
      Sign in with Github
    </button>
  )
}
