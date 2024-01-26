import React, { useState } from 'react';
import {TextInput,Button,Label, Alert, Spinner } from 'flowbite-react';
import {Link,useNavigate } from 'react-router-dom';
import base_url from '../helper.js';
import {useDispatch,useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userslice';

const SignIn = () => {
  const [username,setUsername]=useState(undefined);
  const [password,setPassword]=useState(undefined);

  // const [errorMessage,setErrorMessage]=useState(null);
  // const [loading,setLoading]=useState(false);
  const {loading,error:errorMessage}=useSelector(state=>state.user);

  const navigate=useNavigate();
  const dispatch=useDispatch();

const handleSignIn=async(e)=>{
  e.preventDefault();
  try {
    //initial Check
    if(!username||!password){
      return dispatch(signInFailure("Please fill out all the fields."));
    }
    // setLoading(true);
    // setErrorMessage(null);
    dispatch(signInStart());
    // Make a POST request to the backend API
    const response=await fetch(`${base_url.backend_url}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username,password}),
    });

    const data = await response.json();
    if(data.success===false){
      return dispatch(signInFailure(data.message));
      //setErrorMessage(data.message);
    }
    console.log(data);
    // setLoading(false);
    if(response.ok){
      dispatch(signInSuccess(data));
      navigate('/');
    }

  } catch (error) {
    //Server Error
    dispatch(signInFailure(error.message));
  }

}
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
              <TextInput id='username' type="text" placeholder="Enter your Username" required   onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className=''>
              <Label value="password" />
              <TextInput id='password' type="password" placeholder="Enter your Password" required  onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button gradientDuoTone='tealToLime' type='submit' onClick={handleSignIn} disabled={loading}>
              { loading? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
                </>
              ):'SignIn'}
              </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to="/signup" className='text-blue-500'>SignUp
            </Link>
          </div>
          {
            errorMessage&&(
              <Alert className='mt-5' color='failure'>
              {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default SignIn;
