import { Alert, Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import {FaFacebook} from "react-icons/fa";
import React, { useState } from "react";
import { GoogleAuthProvider,FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function Oauth() {
  const [errorMessage,setErrorMessage]=useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const result = await signInWithPopup(auth, provider);
      const response = await fetch(`/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          googlePhotoUrl: result.user.photoURL,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setErrorMessage(null);
        dispatch(signInSuccess(data));
        navigate("/");
      }
      else{
        setErrorMessage(data.message);
      }
    } catch (error) {
        setErrorMessage(error.message);
      console.log(error);
    }
  };
  const handleFacebookSignin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const response = await fetch(`/api/auth/facebook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          facebookPhotoUrl: result.user.photoURL,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setErrorMessage(null);
        dispatch(signInSuccess(data));
        navigate("/");
      }
      else{
        setErrorMessage(data.message);
      }
    } catch (error) {
        setErrorMessage(error.message);
        console.log(error);
    }
  };
  return (
    <>
      <Button
        type="button"
        gradientDuoTone="pinkToOrange"
        outline
        onClick={handleGoogleSignin}
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2" />
        Continue with Google
      </Button>
      <Button
        type="button"
        gradientDuoTone="cyanToBlue"
        outline
        onClick={handleFacebookSignin}
      >
        <FaFacebook className="w-6 h-6 mr-2" />
        Continue with Facebook
      </Button>
      {errorMessage&&(<Alert color="failure">{errorMessage}</Alert>)}
    </>
  );
}
