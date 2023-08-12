import { Schema , models , model } from "mongoose";

const userSchema = new Schema({
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    role : {
        type : String,
        default : "USER"
    },
    createdAt : {
        type : Date,
        immutable: true,
        default : () => Date.now()
    }
})

const User = models.User || model("User" , userSchema)
export default User