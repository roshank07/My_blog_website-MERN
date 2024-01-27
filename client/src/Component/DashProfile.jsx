import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "../redux/user/userSlice";
import {HiOutlineExclamationCircle} from 'react-icons/hi'


export default function DashProfile() {
    const {currentUser,error,loading} = useSelector(state=>state.user);
    const [imageFile,setImageFile]=useState(null);
    const [imageUrl,setImageFileUrl]=useState(null);
    const [imageFileUploading,setImageFileUploading]=useState(false);
    const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null);
    const [imageFileUploadError,setImageFileUploadError]=useState(null);
    const [updateUserSuccess,setUpdateUserSuccess]=useState(null);
    const [updateUserError,setUpdateUserError]=useState(null);
    const [formData, setFormData] = useState({});
    const [showModal,setShowModal]=useState(false);
    const filePickerRef=useRef();
    const dispatch=useDispatch();

    const handleChangeImage=(e)=>{
        const file=e.target.files[0];

        if(file){
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }
    
    useEffect(()=>{
        if(imageFile){
            uploadFile();
        }

    },[imageFile])

    const uploadFile=async()=>{

    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
    };
    const handleUpdateUser=(e)=>{
      setFormData({ ...formData, [e.target.id]:e.target.value });
    }
      // console.log(formData);

    const handleClickUpdate=async(e)=>{
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if(Object.keys(formData).length===0){
        setUpdateUserError('No Changes made.')
        return;
      }
      if(imageFileUploading){
        setUpdateUserError('Please wait for image to upload');
        return;
      }
      try {
        dispatch(updateStart());
        const result = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await result.json();
        if (!result.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
         
        } else {
          dispatch(updateSuccess(data));
          setUpdateUserSuccess('Profile Updated Successfully!!!')
        }
      }catch(error){
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
      }
      setFormData({});
    }
  const handleDeleteUser=async()=>{
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const result=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data=await result.json();
      if(result.ok){
        dispatch(deleteUserSuccess(data));
      }
      else{
        dispatch(deleteUserFailure(data.message));
      }
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
    

  }
  const handleSignout=async()=>{
    try {
      dispatch(deleteUserStart());
      const result=await fetch(`/api/user/signout/${currentUser._id}`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data=await result.json();
      if(result.ok){
        dispatch(deleteUserSuccess(data));
      }
      else{
        dispatch(deleteUserFailure(data.message));
      }
      
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-2xl">Profile</h1>
      <form className="flex flex-col gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleChangeImage}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          id="username"
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleUpdateUser}
        />
        <TextInput
          id="email"
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleUpdateUser}
        />
        <TextInput
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleUpdateUser}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          onClick={handleClickUpdate}
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading..." : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to="/createpost">
            <Button
              type="button"
              gradientDuoTone="cyanToBlue"
              className="w-full"
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className="flex justify-between mt-4 text-red-500">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
