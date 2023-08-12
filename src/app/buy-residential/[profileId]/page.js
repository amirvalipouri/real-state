import Profile from '@/models/Profile'
import DetailsPage from '@/template/DetailsPage'
import connectDB from '@/utils/connectDB'
import React from 'react'

const ProfileId = async ({ params }) => {
    await connectDB()
    const profile = await Profile.findOne({_id : params?.profileId})
    console.log(profile)
    return (
        <DetailsPage data={profile} />
    )
}

export default ProfileId