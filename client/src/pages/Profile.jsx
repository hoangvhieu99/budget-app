import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input/Input";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";
import { toast } from "react-toastify";
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const fileRef = useRef(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    // console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error("Update failed");
        dispatch(updateUserFailure(data));
        return;
      }
      toast.success("Update successful");
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      toast.error("Update failed");
      dispatch(updateUserFailure(error));
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error("Delete User failed");
        dispatch(deleteUserFailure(data));
        return;
      }
      toast.success("Delete User successful");
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      toast.error("Delete User failed");
      dispatch(deleteUserFailure(error));
    }
  };
  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      toast.success("Logout successful");
      dispatch(signOut());
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700 font-medium">
              Error uploading image (File size must be less than 2MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700 font-medium">{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700 font-medium ">
              Image uploaded successfully
            </span>
          ) : (
            ""
          )}
        </p>
        <Input
          id="username"
          type="text"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleOnChange}
        />
        <Input
          id="email"
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleOnChange}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleOnChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 font-medium cursor-pointer"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </span>
        <span
          className="text-red-700 font-medium cursor-pointer"
          onClick={handleSignOut}
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong"}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "User is update successfully"}
      </p>
    </div>
  );
}
