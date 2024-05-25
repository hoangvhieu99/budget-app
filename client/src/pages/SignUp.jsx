import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import { useState } from "react";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        toast.error("Sign up failed");
        setError(true);
        return;
      }
      toast.success("Sign up successfully!");
      navigate("/sign-in");
    } catch (error) {
      toast.error("Sign up failed");
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
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
          disabled={loading}
          className="p-3 bg-slate-700 text-white font-semibold rounded-lg my-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "...Loading" : "Sign up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p className="font-medium">Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500 font-medium">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 text-center font-bold mt-4">
        {error && "Username && Email could exist"}
      </p>
    </div>
  );
}
