import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [mentors, setMentors] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchMentors();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    navigate("/");
  };

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("access");

      const response = await api.get(
        "profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMentors = async () => {
    try {
      const response =
        await api.get("mentors/");

      setMentors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">

          <h1 className="text-2xl font-bold text-indigo-600">
            TalentHub
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold">
            Welcome back, {profile.username} 👋
          </h2>

          <p className="mt-2">
            Find your next mentor session.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Profile
          </h3>

          <p>
            <strong>Username:</strong>{" "}
            {profile.username}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {profile.email}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">
          Available Mentors
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-2xl shadow p-6"
            >
              <h3 className="text-xl font-bold">
                {mentor.name}
              </h3>

              <span className="inline-block mt-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                {mentor.expertise}
              </span>

              <p className="mt-4 text-slate-600">
                {mentor.bio}
              </p>

              <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                Book Session
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;