import SignupPage from '@/template/SignupPage'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const SignUp = async () => {
  const session = await getServerSession(authOptions)
  if(session) redirect("/")
  return (
    <SignupPage/>
  )
}

export default SignUp