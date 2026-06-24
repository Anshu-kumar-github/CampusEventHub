import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      login(
        response.data.user,
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          CampusEventHub
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded"
          >
            Login
          </button>

        </form>

        <p className="mt-4 text-center">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-600"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );

};

export default Login;