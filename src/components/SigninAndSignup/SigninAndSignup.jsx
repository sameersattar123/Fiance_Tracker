import React, { useState } from 'react'
import "./style.css"
import Input from '../Input/Input'

const SigninAndSignup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [comfirmPassword, setComfirmPassword] = useState('')

  return (
    <div className='signup-wrapper'>
      <h2 className='title'>
        Sign Up on <span>Financely.</span> 
      </h2>
      <form action="">
        <Input
        label={"Full Name"}
        state={name}
        setState={setName}
        placeholder={"Sameer Sattar"}
        />
        <Input
        label={"Email"}
        state={email}
        setState={setEmail}
        placeholder={"sameersattar@123gmail.com"}
        />
        <Input
        label={"Password"}
        state={password}
        setState={setPassword}
        placeholder={"Example@123"}
        />
        <Input
        label={"Comfirm Password"}
        state={comfirmPassword}
        setState={setComfirmPassword}
        placeholder={"Example@123"}
        />
      </form>
    </div>
  )
}

export default SigninAndSignup