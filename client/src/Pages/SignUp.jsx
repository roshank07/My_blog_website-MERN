import React from 'react';
import { Navbar,TextInput,Button,Label } from 'flowbite-react';
import {Link,useLocation } from 'react-router-dom';

const SignUp = () => {

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/*left*/}
        <div className='flex-1'>
          <Link to="/" className='text-4xl font-bold dark:text-white'>
          <span className='px-2 py-1 bg-gradient-to-r 
          from-blue-500 via-purple-500 to-pink-500
          rounded-lg text-white'>Roshan's</span>
              Blog
          </Link>
          <p className='text-sm mt-5'>
            This website is in beta.
          </p>
        </div>

        {/*right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div className=''>
              <Label value="Username" />
              <TextInput id='username' type="text" placeholder="Enter your Username" required />
            </div>
            <div className=''>
              <Label value="Email" />
              <TextInput id='email' type="email" placeholder="john.doe@example.com" required />
            </div>
            <div className=''>
              <Label value="password" />
              <TextInput id='password' type="password" placeholder="Enter your Password" required />
            </div>
            <Button gradientDuoTone='tealToLime' type='submit'>SignUp</Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Already have an account?</span>
            <Link to="/signin" className='text-blue-500'>SignIn
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
