import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Profile from '@/models/Profile'
import User from '@/models/User'
import MyProfilesPage from '@/template/MyProfilesPage'
import connectDB from '@/utils/connectDB'
import { getServerSession } from 'next-auth'
import React from 'react'

const Myprofile = async () => {
  await connectDB()
  const session = await getServerSession(authOptions)
  const [user] = await User.aggregate([
    { $match: { email: session?.user?.email } },
    {
      $lookup: {
        from: "profiles",
        foreignField: "userId",
        localField: "_id",
        as: "profiles",
      }
    }
  ])
  console.log(user)
  // const profiles = await Profile.findOne({userId : user._id})
  // console.log(profiles)
  return (
    <MyProfilesPage profiles={user?.profiles} />
  )
}

export default Myprofile