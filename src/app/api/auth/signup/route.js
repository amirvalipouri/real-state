import { NextResponse } from "next/server";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export async function POST(req){
    try{
        await connectDB()
        const {email , password } = await req.json()
        if(!email || !password){
            return NextResponse.json({error : "لطفا اطلاعات خود را به صورت دقیق وارد کنید"},{status : 422})
        }
        const existUser = await User.findOne({email})
        if(existUser){
            return NextResponse.json({error : "شما قبلا ثبت نام کرده اید"},{status : 422})
        }

        const hashedPassword = await hashPassword(password)
        const newUser = await User.create({
            email , password : hashedPassword
        })
        console.log(newUser)
        return NextResponse.json({message : "خوش آمدید"},{status : 201})

    }catch(err){
        console.log(err)
        return NextResponse.json({error : "Some problem in server!"},
            {status : 500}
        )
    }
}