import { signIn, signOut, useSession} from "next-auth/react"

export default function Login() {
  const { data: session } = useSession()


  if(!session) {
    return (
      <div className="flex flex-col gap-2 w-1/2 m-auto p-10">
        <p>Please sign in: </p>
        <button className='p-2 bg-slate-600 text-white' onClick={() => signIn('github')}>Sign in with Github</button>
      </div>
    )
  }

  return (
    <div>
      <p>You are signed in as {session.user?.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
