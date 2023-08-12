import { Schema , models , model } from "mongoose";

const profileSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    realState : {
        type : String,
        required : true
    },
    constructionDate : {
        type : Date,
        required : true
    },
    category : {
        type : String,
        required : true,
        enum : ["villa","apartment","store" , "office"]
    },
    rules : {
        type : [String],
        default : []
    },
    amenities : {
        type : [String],
        default : []
    },
    userId : {
        type : Schema.Types.ObjectID,
        ref : "User"
    },
    published : {
        type : Boolean,
        default : false
    }
},{timestamps : true})

const Profile = models.Profile || model("Profile" , profileSchema)
export default Profile