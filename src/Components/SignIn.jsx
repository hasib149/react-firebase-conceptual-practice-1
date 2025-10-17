import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import { auth } from "../Firebase/Firebase.config";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";

const Googleprovider = new GoogleAuthProvider();

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState("flase");
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log({ email, password });
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        setUser(result.user);
        toast.success("SignIn Sucessfull");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    // const email = e.target.email.value;
    // const password = e.target.password.value;

    signInWithPopup(auth, Googleprovider)
      .then((result) => {
        console.log(result);
        setUser(result.user);
        toast.success("SignIn Sucessfull");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("SignOut successfull");
        setUser(null);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  console.log(user);

  return (
    <div className="min-h-[calc(100vh-20px)] flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Animated glow orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
        {/* Left section */}
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            Welcome Back
          </h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            Sign in to continue your journey. Manage your account, explore new
            features, and more.
          </p>
        </div>

        {/* Login card */}
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
          {user ? (
            <div className="text-center space-y-2.5">
              <img
                src={user?.photoURL || "htpps://via.placfedj.com/jj"}
                alt=""
                className="h-20 w-20 rounded-full mx-auto"
              />
              <p className="font-semibold text-xl">{user?.displayName}</p>
              <p className="text-white/60 text-lg">{user?.email}</p>
              <button
                onClick={handleSignOut}
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white 
             bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
             hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
             transition duration-300 shadow-lg"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="space-y-5">
              <h2 className="text-2xl font-semibold mb-2 text-center text-white">
                Sign In
              </h2>

              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="relative">
                <label className="block text-sm mb-1">Password</label>
                <input
                  type={show ? "password" : "text"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-[8px] top-[36px] cursor-pointer z-50"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white 
             bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
             hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 
             transition duration-300 shadow-lg"
              >
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-px w-16 bg-white/30"></div>
                <span className="text-sm text-white/70">or</span>
                <div className="h-px w-16 bg-white/30"></div>
              </div>

              {/* Google Signin */}
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              <p className="text-center text-sm text-white/80 mt-3">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-pink-300 hover:text-white underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
