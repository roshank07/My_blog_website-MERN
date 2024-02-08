import React, { useState } from "react";
import {
  TextInput,
  Button,
  Label,
  Alert,
  Spinner,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

import Oauth from "../Component/Oauth.jsx";

const ForgetPassword = () => {
  const [email, setEmail] = useState(undefined);
  const [errorMessage,setErrorMessage]=useState(null);
  const [loading,setLoading]=useState(false);


  const handleResetPassword = async () => {

    setLoading(true);

    try {
        const result=await fetch(`/api/auth/forget-password`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({email}),
        })
    
        const data=await result.json();
    
        if(result.ok){
            setErrorMessage('Success');
            setLoading(false);
        }
        else{
            setErrorMessage(data.message);
            setLoading(false);
        }
        
    } catch (error) {

        setErrorMessage(error.message);
        setLoading(false);
    }
    
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/*left*/}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span
              className="px-2 py-1 bg-gradient-to-r 
        from-blue-500 via-purple-500 to-violet-500
        rounded-lg text-white"
            >
              Void
            </span>
            Writes
          </Link>
          <p className="text-sm mt-5">This website is in beta.</p>
        </div>

        {/*right */}
        <div className="flex-1">
          <h1 className="text-lg sm:text-xl font-bold flex justify-center mb-10">
            Forgot Password
          </h1>
          <form className="flex flex-col gap-4">
            <div className="">
              <Label value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your Email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-sm hover:underline hover:text-blue-500 hover:cursor-pointer flex justify-end mt-2">
                <Link to={'/signin'}>Signin Instead?</Link>
                </p>
            </div>

            <Button
              gradientDuoTone="tealToLime"
              type="submit"
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Send Email"
              )}
            </Button>
            <p className="flex justify-center">OR</p>
            <Oauth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/signup" className="text-blue-500">
              SignUp
            </Link>
          </div>
          {errorMessage && ( errorMessage==='Success'?(
            <Alert className="mt-5" color="success">
            Email sent successfully.
          </Alert>
          ):(<Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
