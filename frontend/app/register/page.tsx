import React from 'react'
import  RegisterForm  from './registerForm'


function ReagisterPage() {
  return (
    <div  className='max-w-2xl  pt-8 mx-8 md:mx-auto border rounded-md px-8 py-8 my-8'>
      <h1 className=' font-bold text-[25px] py-2 mb-2'>Register Form</h1>
      <RegisterForm />
    </div>
  )
}

export default ReagisterPage