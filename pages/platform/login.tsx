import LoginForm from "@/components/auth/LoginForm"
import { useSession} from "next-auth/react"

export default function Login() {
  const { data: session } = useSession()


  if(!session) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen bg-[#fafafa]' data-theme='fantasy'>
        <LoginForm />
      </div>
    )
  }

  return <></>
}
