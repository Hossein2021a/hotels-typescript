import React from 'react'
import LoginForm from './loginform'

function LoginPage() {
  return (
    <div className='max-w-2xl  pt-8 mx-8 md:mx-auto border rounded-md px-8 my-8'>
      <h1 className=' font-bold text-[25px] text-gray-700 py-4'>Login Form</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage