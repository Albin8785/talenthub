import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {
    try {
      await api.post("register/", {
        username,
        email,
        password,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-slate-800">
          TalentHub
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Create your account
        </p>

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="w-full border rounded-lg p-3 mb-6"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            className="text-indigo-600 font-medium"
            to="/"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;