import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function PATCH(req,context){
    try{
        await connectDB()
        const id = context?.params?.profileId
        const session = await getServerSession(req)
        if(!session) return NextResponse.json({error : "لطفا ابتدا وارد سایت شوید"},{status : 401})
        const user = await User.findOne({email : session?.user?.email})
        if(!user) return NextResponse.json({error : "کاربر یافت نشد"},{status : 402})
        const profile = await Profile.findOne({_id : id})
        if(!profile) return NextResponse.json({error : "آگهی مورد نظر پیدا نشد"},{status : 404})
        profile.published = true
        profile.save()
        return NextResponse.json({data : profile},{status : 200},{message : "success"})
    }catch(err){
        NextResponse.json({ error: "Error in connecting to db" }, { status: 500 })
    }
}