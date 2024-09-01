import { connectDB } from "@/lib/db";
import User from "@/models/userModel";
import bcryptjs, { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken';


export async function POST(req){
    await connectDB();
    const {email,password,role} = await req.json();
    console.log(email + " " + password + " " + role)
    try {
        const user = await User.findOne({email : email})
    if(user){
        return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt)
    const newUser = new User({
        email,
        password:hashedPassword,
        role,
        reviewProduct:[]
    })
    await newUser.save()

    return new Response(JSON.stringify({ message : "User Registred Successfully"}), { status: 200 }); 

    } catch(err){
        console.error(err.message);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
       }
}