import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "../../Firebase/Firebase.config";
import { Link } from "react-router-dom";

const Login = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setRegisterError("");
    setSuccess("");
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.email) {
          setSuccess("User logged in successfully");
        } else {
          alert("Please verify your email address");
        }
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  const handleForgetPassword = (e) => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please fill Email input field", emailRef.current.value);
      return;
    } else if (/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      console.log("Please write a valid Email");
    }
    //send email verification
    sendPasswordResetEmail(auth, email)
      .then(() => alert("Please check your Email"))
      .catch((error) => console.log(error));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                ref={emailRef}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  onClick={handleForgetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p>
              New here? You can{" "}
              <Link className="text-green-500" to={"/register"}>
                Register
              </Link>{" "}
              first.
            </p>
          </form>
          {registerError && <p className="text-red-700">{registerError}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
