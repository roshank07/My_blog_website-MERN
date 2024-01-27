import { Button } from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai';
import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function Oauth() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const auth=getAuth(app);
    const handleGoogleSignin=async()=>{
        const provider= new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'});
        try{
            const result=await signInWithPopup(auth,provider);
            const response=await fetch(`/api/auth/google`,{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    googlePhotoUrl:result.user.photoURL
                }),
            })
            const data=await response.json();
            if(response.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch(error){
            console.log(error);
        }


    }
  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleSignin}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2' />
        Continue with Google
        </Button>
  )
}
