import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function PATCH(req,context){
    try{
        const id = context?.params?.adminId
        const session = await getServerSession(req)
        if(!session) return NextResponse.json({error : "لطفا ابتدا وارد سایت شوید"},{status : 401})
        const user = await User.findOne({_id : id})
        if(!user) return NextResponse.json({error : "کاربر یافت نشد"},{status : 402})
        user.role = "ADMIN"
        user.save()
        return NextResponse.json({message : "change to admin"},{status : 200})
    }catch(err){
        NextResponse.json({ error: "Error in connecting to db" }, { status: 500 })
    }
}