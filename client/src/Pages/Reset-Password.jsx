import React, { useState } from "react";
import {
  TextInput,
  Button,
  Label,
  Alert,
  Spinner,ToggleSwitch
} from "flowbite-react";
import { Link,useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  const {userId,token}=useParams();
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async () => {
    setLoading(true);

    try {
      const result = await fetch(
        `/api/auth/reset-password/${userId}/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await result.json();

      if (result.ok) {
        setErrorMessage("Success");
        setLoading(false);
      } else {
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
            Reset Password
          </h1>
          <form className="flex flex-col gap-4" >
            <div className="">
              <Label value="Password" />
              <TextInput
                id="password"
                type={showPassword?"text":"password"}
                placeholder="Enter new password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-between mt-1">
                <ToggleSwitch
                  className=" text-xs font-light"
                  checked={showPassword}
                  label="Show"
                  onChange={(e) => setShowPassword(!showPassword)}
                />
                <p className="text-sm hover:underline hover:text-blue-500 hover:cursor-pointer flex justify-end mt-2">
                <Link to={"/signin"}>Signin Now?</Link>
              </p>
              </div>
              
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
                "Reset Password"
              )}
            </Button>
          </form>
         
          {errorMessage && (errorMessage === "Success" ? (
            <Alert className="mt-5" color="success">
                 Password changed successfully. Sign in Now
            </Alert>
          ) : (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>)
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
