import React, { useState } from "react";
import { TextInput, Button, Label, Alert, Spinner,ToggleSwitch } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import Oauth from "../Component/Oauth.jsx";

const SignIn = () => {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [showPassword, setShowPassword] = useState(false);

  // const [errorMessage,setErrorMessage]=useState(null);
  // const [loading,setLoading]=useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      //initial Check
      if (!email || !password) {
        return dispatch(signInFailure("Please fill out all the fields."));
      }
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      // Make a POST request to the backend API
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
        //setErrorMessage(data.message);
      }
      console.log(data);
      // setLoading(false);
      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      //Server Error
      dispatch(signInFailure(error.message));
    }
  };
  const handleForgotPassword=()=>{

  }
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
            </div>
            <div >
              <Label value="Password" />
              <TextInput
                id="password"
                type={showPassword?"text":"password"}
                placeholder="Enter your Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between mt-1">
              <ToggleSwitch className=" text-xs font-light" checked={showPassword} label="Show" onChange={(e)=>setShowPassword(!showPassword)} />
               <p className="text-sm hover:underline hover:text-blue-500 hover:cursor-pointer">
                <Link to={'/forget-password'}>Forgot Password?</Link>
                </p>
              </div>
               
            </div>
            <Button
              gradientDuoTone="tealToLime"
              type="submit"
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "SignIn"
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
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
