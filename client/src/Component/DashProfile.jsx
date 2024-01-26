import { Button, TextInput } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux';
// import {currentUser} from '../redux/user/userSlice'

export default function DashProfile() {
    const {currentUser} = useSelector(state=>state.user);
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-2xl'>Profile</h1>
        <form className='flex flex-col gap-2'>
            <div className='w-32 h-32 self-center cursor-pointer 
                            shadow-md overflow-hidden rounded-full' >
                <img src={currentUser.profilePicture} alt='user'
                 className='rounded-full w-full h-full object-cover border-8 border-[lightgray] ' />
            </div>
            <TextInput id='username' type="text" placeholder='username' defaultValue={currentUser.username} />
            <TextInput id='email' type="email" placeholder='email' defaultValue={currentUser.email} />
            <TextInput id='password' type="password" placeholder='Password' />
            <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
        </form>
        <div className='flex justify-between mt-4 text-red-500'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
    
  );
}
