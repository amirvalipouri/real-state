import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import User from '@/models/User'
import Adminset from '@/module/Adminset'
import { getServerSession } from 'next-auth'
import React from 'react'

const Admin = async () => {
  
  const user = await User.find({role : "USER"})
  console.log(user)
  return (
    <div>
      {user?.map((e)=>
        <Adminset key={e._id} data={JSON.parse(JSON.stringify(e))} />
      )}
      
    </div>
  )
}

export default Admin