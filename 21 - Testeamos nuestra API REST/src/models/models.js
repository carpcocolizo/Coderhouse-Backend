import mongoose from "mongoose"
 
const User = mongoose.model('Users',{
    username: {type: "string", required: true},
    password: {type: "string", required: true},
    firstname: {type: "string", required: true},
    address: {type: "string", required: true},
    age: {type: "mixed", required: true},
    telephonenumber: {type: "mixed", required: true},
    avatar: {type: "string", required: false},
    carrito: {type: "string", required: true}
});

export default User