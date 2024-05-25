import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// assets
import logomark from "../assets/logomark.svg";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="flex gap-2">
          <img src={logomark} alt="" className="logo-home" />
          <span className="font-bold">HomeBudget</span>
        </Link>
        <ul className="flex gap-4">
          {currentUser ? (
            <>
              <Link to="/dashboard">
                <li>Dashboard</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
            </>
          )}

          <Link to="/about">{currentUser ? <></> : <li>About</li>}</Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover "
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
