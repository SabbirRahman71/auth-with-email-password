import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);

    // Reset error
    setRegisterError("");
    setSuccess("");
    if (password.length < 6) {
      setRegisterError("password should be atleast 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError("Password must contain at least one uppercase letter.");
    } else if (!accepted) {
      setRegisterError(
        "You can not procced without accepting or terms and condition"
      );
    }

    // Create user
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      console.log(result.user);
      setSuccess("Account created successfully");
    });
    //Update profile
    updateProfile(result.user, {
      displayName: name,
      photoURL: "https//example.com/jane-q-user/profile",
    })
      .then(() => console.log("profile updated"))
      .catch((error) => console.log(error));

    //send email verification
    sendEmailVerification(result.user)
      .then(() => {
        alert("please check your email and verify your account");
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };

  return (
    <div className="border">
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl mb-6 mt-4">Registration here</h2>
        <form onSubmit={handleRegister}>
          <input
            className=" w-full border-2 px-4 py-2"
            type="text"
            name="name"
            placeholder="Enter Your Name"
          />
          <input
            className="my-4 w-full border-2 px-4 py-2"
            type="email"
            name="email"
            placeholder="Enter Your Email"
          />
          <br />
          <div className="relative">
            <input
              className=" border-2 mb-4 w-full px-4 py-2"
              type={showPassword ? "test" : "password"}
              name="password"
              placeholder="Enter Your Password"
            />
            <span
              onClick={() => {
                setShowpassword(!showPassword);
              }}
              className=" absolute top-3 right-2 hover:cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <br />
          <input type="checkbox" name="terms" id="" />
          <label htmlFor="terms">
            Accept our{" "}
            <a className="border-b" href="#">
              terms and condition
            </a>
            .
          </label>
          <br />
          <br />
          <input
            className="btn btn-secondary mb-6 w-full"
            type="submit"
            value="Register"
          />
          <p>
            Already have an account?{" "}
            <Link className="text-green-600" to={"/login"}>
              Login
            </Link>{" "}
            here.
          </p>
        </form>
        {registerError && <p className="text-red-700">{registerError}</p>}
        {success && <p className="text-green-600">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
