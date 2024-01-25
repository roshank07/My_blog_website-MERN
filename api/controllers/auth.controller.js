import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import JsonWebToken from "jsonwebtoken";
const authController={
    signUp:async(req,res,next)=>{
        // console.log("Inhere_conroller",req.body);
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
   signIn:async(req,res,next)=>{
    const {username,password}=req.body;
    if(!username||!password||username===''||password===''){
        // res.status(400).json({message:'Please enter all the field'});
        next(errorHandler(400,'Please enter all the fields'));
        return;
    }
    try{
        const userData = await User.findOne({ username:username });

        if(userData){
            const PasswordVerify=bcryptjs.compareSync(password, userData.password);
            
            if(PasswordVerify){
                const token= await JsonWebToken.sign(
                    {id:userData._id},process.env.JWT_SECRET);

                const {password:pass,...rest}=userData._doc;

                res.status(200).cookie('access_token',token,{httpOnly:true})
                    .json(rest);
            }
            else
            {
                next(errorHandler(400,'Invalid Password'));
                return;
            }
        }
        else{
            next(errorHandler(404,'User not found'));
            return;
        }

    }catch(error){
       next(error);
    }

   },
}
   
   export default authController;