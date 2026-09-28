import mongoose from "mongoose";


const UsersSchema=
mongoose.Schema({
 
email:String,
password:String,
role:String,

})

const UsersModel=
mongoose.model("user",UsersSchema)

export default UsersModel;