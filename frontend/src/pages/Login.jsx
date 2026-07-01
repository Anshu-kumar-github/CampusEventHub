import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaCalendarCheck,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt
} from "react-icons/fa";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login, token } = useAuth();

  useEffect(() => {

  if (token) {
    navigate("/dashboard");
  }

}, [token, navigate]);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );
      console.log(response.data.user);

      login(response.data.user, response.data.token);

toast.success("Login successful!");

setTimeout(() => {
  navigate("/dashboard");
}, 500);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

<div
  className="
    min-h-screen
    bg-gradient-to-br
    from-white
via-blue-50
to-indigo-100
    flex
    items-center
    justify-center
    px-6
    relative
    overflow-hidden
  "
>

  {/* Background Circle */}

  <div
    className="
      absolute
      w-72
      h-72
      rounded-full
      bg-blue-200/40
      blur-3xl
      -left-20
      top-20
    "
  ></div>

  <div
    className="
      absolute
      w-80
      h-80
      rounded-full
      bg-purple-300/30
      blur-3xl
      right-0
      top-0
    "
  ></div>

  {/* Login Card */}

  <div
    className="
      relative
      z-10
      bg-white/90
      backdrop-blur-lg
      rounded-3xl
      shadow-2xl
transition-all
duration-300
hover:-translate-y-1
hover:shadow-blue-200
      w-full
      max-w-lg
      p-10
    "
  >

    {/* Logo */}

    <div className="text-center">

      <div
        className="
          h-20
          w-20
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          mx-auto
          mb-7
        "
      >

        <FaCalendarCheck
          className="
            text-4xl
            text-blue-600
          "
        />

      </div>

      <h1
        className="
          text-4xl
          font-bold
          text-gray-800
        "
      >

        CampusEventHub

      </h1>

      <p
        className="
          text-gray-500
          mt-2
        "
      >

        Discover. Participate. Connect.

      </p>

      <div className="flex justify-center my-6">
  <div className="w-16 h-1 rounded-full bg-blue-600"></div>
</div>

    </div>

    <h2
      className="
        text-2xl
        font-semibold
        text-center
        mb-2
      "
    >

      Welcome Back!

    </h2>

    <p
      className="
        text-center
        text-gray-500
        mb-10
      "
    >

      Login to continue your account

    </p>

    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
    {/* Email */}

<div className="relative">

  <FaEnvelope
  className="
    absolute
    left-4
    top-1/2
    -translate-y-1/2
    pointer-events-none
    text-gray-400
    text-lg
  "
/>

  <input
    type="email"
    placeholder="Email Address"
    value={email}
    onChange={(e) =>
      setEmail(e.target.value)
    }
    required
    className="
      w-full
      rounded-xl
      border
      border-gray-300
      pl-12
      pr-4
      py-4
      focus:ring-2
      focus:ring-blue-500
      outline-none
    "
  />

</div>

{/* Password */}

<div className="relative">

  <FaLock
    className="
absolute
left-4
top-1/2
-transform
-translate-y-1/2
text-gray-400
"
  />

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
    required
    className="
      w-full
      rounded-xl
      border
      border-gray-300
      pl-12
      pr-12
      py-4
      focus:ring-2
      focus:ring-blue-500
      outline-none
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(!showPassword)
    }
    className="
      absolute
      right-4
      top-1/2
      -translate-y-1/2
      text-gray-500
    "
  >

    {showPassword
      ? <FaEyeSlash />
      : <FaEye />}

  </button>

</div>

{/* Remember */}

<div
  className="
    flex
    items-center
    justify-between
    text-sm
  "
>

  <label
    className="
      flex
      items-center
      gap-2
      text-gray-600
    "
  >

    <input type="checkbox" />

    Remember Me

  </label>

  <button
    type="button"
    className="
      text-blue-600
      hover:underline
    "
  >
    Forgot Password?
  </button>

</div>

<button
  type="submit"
  className="
    w-full
    rounded-xl
    bg-gradient-to-r
    from-blue-600
    to-indigo-600
    text-white
    py-4
    text-lg
    font-semibold
    flex
    items-center
    justify-center
    gap-2
    hover:shadow-lg
    transition
  "
>

  <FaSignInAlt />

  Login

</button>

</form>

<p
  className="
    text-center
    text-gray-600
    mt-8
  "
>

  Don't have an account?{" "}

  <Link
    to="/register"
    className="
      text-blue-600
      font-semibold
      hover:underline
    "
  >

    Register

  </Link>

</p>

</div>

</div>

);

};

export default Login;