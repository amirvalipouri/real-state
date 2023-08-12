import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req){
    try{
        await connectDB()
        const profile = await Profile.find({published : true}).select("-userId")
        return NextResponse.json({data : profile},{status : 200})
    }catch(err){
        NextResponse.json({ error: "Error in connecting to db" }, { status: 500 })
    }
}

export async function POST(req) {
    try {
        await connectDB()
        const { title, description, location, phone, price, realState, category, constructionDate, rules, amenities } = await req.json()
        const session = await getServerSession(req)
        if(!session) return NextResponse.json({error : "لطفا ابتدا وارد سایت شوید"},{status : 401})

        const user = await User.findOne({email : session?.user?.email})
        if(!user) return NextResponse.json({error : "حساب کاربری یافت نشد"},{status : 404})

        if(!title || !description || !location || !phone || !price || !realState || !category || !constructionDate){
            return NextResponse.json({error : "اطلاعات معتبر نیست"},{status : 400})
        }

        const newProfile = await Profile.create({
            title,
            description,
            location,
            phone,
            category,
            rules,
            amenities,
            price : +price,
            realState,
            constructionDate,
            userId : new Types.ObjectId(user?._id)
        })

        console.log(newProfile)
        return NextResponse.json({message : "profile added!"},{status : 201})
    }catch (err) {
        NextResponse.json({ error: "Error in connecting to db" }, { status: 500 })
    }
}

export async function PATCH(req){
    try{
        await connectDB()
        const { _id,title, description, location, phone, price, realState, category, constructionDate, rules, amenities } = await req.json()
        const session = await getServerSession(req)
        if(!session) return NextResponse.json({error : "لطفا ابتدا وارد سایت شوید"},{status : 401})

        const user = await User.findOne({email : session?.user?.email})
        if(!user) return NextResponse.json({error : "حساب کاربری یافت نشد"},{status : 404})

        if(!_id || !title || !description || !location || !phone || !price || !realState || !category || !constructionDate){
            return NextResponse.json({error : "اطلاعات معتبر نیست"},{status : 400})
        }

        const profile = await Profile.findOne({_id})
        if(!user._id.equals(profile?.userId)) return NextResponse.json({error : "دسترسی شما به این آگهی محدود است"},{status : 403})

        profile.title = title
        profile.location = location
        profile.phone = phone
        profile.price = price
        profile.rules = rules
        profile.realState = realState
        profile.category =category
        profile.description = description
        profile.amenities = amenities
        profile.constructionDate = constructionDate
        profile.save()
        return NextResponse.json({message : "اطلاعات با موفقیت ویرایش شد"},{status : 201})
    }catch (err) {
        NextResponse.json({ error: "Error in connecting to db" }, { status: 500 })
    }
}



