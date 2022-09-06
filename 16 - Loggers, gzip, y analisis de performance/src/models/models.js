import mongoose from "mongoose"
 
const User = mongoose.model('Users',{
    username: String,
    password: String,
});

export default User