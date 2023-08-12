import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

export const authOptions = {
    session : { strategy : "jwt" },
    providers : [CredentialsProvider({
        async authorize(credentials){
            const { email , password } = credentials
            try{
                await connectDB()
            }catch(err){
                throw new Error("problem in connecting to server!")
            }

            if(!email || !password){
                throw new Error("لطفا ورودی معتبر وارد کنید")
            }

            const existUser = User.findOne({email})
            if(!existUser){
                throw new Error("لطفا ابتدا ثبت نام کنید")
            }

            const isValidPassword = verifyPassword(password , existUser.password)
            if(!isValidPassword) throw new Error("ایمیل یا رمزعبور اشباه است")

            return {email}
        }
    })]
}

const handler = NextAuth(authOptions)
export { handler as GET , handler as POST }