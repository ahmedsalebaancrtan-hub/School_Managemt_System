import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useUserStore } from "@/store/user.store"
import type { IuserLoginRequest } from "@/types/user"


export const Login = () => {
  const [email, setEmail] = useState("")
  const  [Password, setPassword] = useState("")

  const {isLoading, user, loginUser} = useUserStore()

  const HandleLogin = () =>{
    const data : IuserLoginRequest= {
      emailaddress : email,
      password : Password
    }
loginUser(data)

  }
  return (
    <div className='container flex items-center h-screen justify-center mx-auto'>
    <div className="content">
      <div className="header">
        <h1 className="text-xl font-bold">sing In to your acount </h1>
        <p className="text-gray-500">
          please enter your email and password to access your account 
        </p>
      </div>

      <div className="form mt-6">
        <form action="" className="grid gap-3">
          <div className="input-container grid gap-3">
      <Label>
        EmailAddress
      </Label>
      <Input 
      value={email}
      onChange={e => setEmail(e.target.value)}
      type="text" placeholder="EmailAddress" />
            

          </div>
          <div className="input-container grid gap-3">
      <Label>
   Password
      </Label>
      <Input
      value={Password}
      onChange={e => setPassword(e.target.value)}
      
      type="password" placeholder="password" />
            

          </div>
          <Button onClick={HandleLogin}   disabled={isLoading} >
            {isLoading ? "...Loading" : "SingIn"}
          </Button>
        </form>
      </div>
    </div>
    </div>
  )
}
