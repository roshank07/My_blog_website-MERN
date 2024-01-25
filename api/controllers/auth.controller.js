import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
const authController={
    signUp:async(req,res,next)=>{
        const{username,email,password}=req.body;
        if(!username||!password||!email||username===''||password===''||email===''){
            // res.status(400).json({message:'Please enter all the field'});
            next(errorHandler(400,'Please enter all the fields'));
            return;
        }
        const hashedPassword=bcryptjs.hashSync(password,10);
        const user=new User({
            username:username,
            email:email,
            password:hashedPassword
            });
        try{
            const response=await user.save();
            // console.log(response);
            res.status(200).json({message:'successfully Signed UP!!!'});
    
        }catch(error){
           next(error);
            }
   },
   }
   
   export default authController;