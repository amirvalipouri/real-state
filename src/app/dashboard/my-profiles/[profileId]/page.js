import Profile from '@/models/Profile'
import AddProfilePage from '@/template/AddProfilePage'
import connectDB from '@/utils/connectDB'
import React from 'react'

const ProfileId = async ({params : {profileId}}) => {
  await connectDB()
  const profile = await Profile.findOne({_id : profileId})
  if(!profile) return <h3>مشکلی پیش آمده است ...</h3>
  return (
    <AddProfilePage data={JSON.parse(JSON.stringify(profile))}/>
  )
}

export default ProfileId