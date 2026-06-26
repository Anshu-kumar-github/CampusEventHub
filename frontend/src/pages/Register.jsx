import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

import api from "../services/api";

const Register = () => {

    const navigate = useNavigate();

const { token } = useAuth();

useEffect(() => {

  if (token) {
    navigate("/dashboard");
  }

}, [token, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    role: "student",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/auth/register",
        formData
      );

      toast.success(
  response.data.message ||
  "Registration successful!"
);

setTimeout(() => {
  navigate("/");
}, 1000);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="border p-6 rounded w-96 bg-white">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border p-2 w-full mb-3"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 w-full mb-3"
          />

          <input
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College"
            className="border p-2 w-full mb-3"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 w-full mb-3"
          >
            <option value="student">
              Student
            </option>

            <option value="college_admin">
              College Admin
            </option>
          </select>

          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 w-full mb-3"
          />

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Register
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;