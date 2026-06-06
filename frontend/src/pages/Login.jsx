import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
     const response = await api.post("token/", {
  username,
  password,
});
      localStorage.setItem(
        "access",
        response.data.access
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-slate-800">
          TalentHub
        </h1>

        <p className="text-center text-slate-500 mt-2 mb-8">
          Learn from industry mentors
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
          className="w-full border rounded-lg p-3 mb-6"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            className="text-indigo-600 font-medium"
            to="/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;