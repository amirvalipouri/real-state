import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Profile from '@/models/Profile'
import User from '@/models/User'
import AdminPage from '@/template/AdminPage'
import connectDB from '@/utils/connectDB'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Waiting = async () => {
    await connectDB()
    const session = await getServerSession(authOptions)
    if(!session) return redirect('/signin')
    const user = await User.findOne({email : session?.user?.email})
    if(!user) return <h3>کاربر پیدا نشد</h3>
    if(user?.role !== "ADMIN") return redirect('/dashboard')
    const profile = await Profile.find({published : false})
    return (
        <AdminPage profiles={profile}/>
    )
}

export default Waiting