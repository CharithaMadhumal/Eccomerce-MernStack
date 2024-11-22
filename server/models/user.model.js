import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {

    },
    email : {
        type : String,
        required : [true, "provide email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "provide password"]
    },
    avatar : {
        type : String,
        default : ""
    },
    mobile : {
        type : Number,
        default : null
    },
    refreshtoken : {
        type : String,
        default: ""
    },
    verify_email : {
        type : Boolean,
        default : false
    },

    last_login_Date : (
        type : Date,
        default num :["Active",""]
    )
})