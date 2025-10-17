import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Link } from "react-router";
import { auth } from "../Firebase/Firebase.config";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const SignUp = () => {
  const [show, setShow] = useState("flase");
  const handleSignUp = (e) => {
    e.preventDefault();
    // console.log("submitte click");
    const email = e.target.email.value;
    const password = e.target.password.value;

    const strongPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!strongPass.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        toast.success("Sign Up successfull");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {
          toast.error("❌ This email is already registered!");
        } else if (errorCode === "auth/invalid-email") {
          toast.error("📧 Invalid email format!");
        } else if (errorCode === "auth/weak-password") {
          toast.error("🔑 Password must be at least 6 characters long!");
        } else if (errorCode === "auth/network-request-failed") {
          toast.error(
            "🌐 Network error. Please check your internet connection."
          );
        } else {
          toast.error("⚠️ " + errorMessage); // fallback
        }
      });
  };
  return (
    <div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-5xl font-extrabold drop-shadow-lg">
            Create Your Account
          </h1>
          <p className="mt-4 text-lg text-white/80 leading-relaxed">
            Join our community and unlock exclusive features. Your journey
            begins here!
          </p>
        </div>

        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Sign Up
          </h2>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={show ? "password" : "text"}
                name="password"
                placeholder="••••••••"
                className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
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
              Sign Up
            </button>

            <div className="text-center mt-3">
              <p className="text-sm text-white/80">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-pink-300 hover:text-white font-medium underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
