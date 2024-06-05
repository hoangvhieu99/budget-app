import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import { useEffect, useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const { loading, error } = useSelector((state) => state.user);
  // const error = useSelector((state) => state.user.error);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());

      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error("Login Failed");
        dispatch(signInFailure(data));
        return;
      }
      toast.success("Login Success");
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      toast.error("Login Failed");
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          // disabled={loading}
          className="p-3 bg-slate-700 text-white font-semibold rounded-lg my-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Sign in
          {/* {loading ? "...Loading" : "Sign in"} */}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-medium">Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500 font-medium">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 text-center font-bold mt-4">
        {/* {error ? error || "something went wrong" : ""} */}
      </p>
    </div>
  );
}
