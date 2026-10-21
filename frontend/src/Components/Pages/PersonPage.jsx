import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8081";

export default function PersonPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      setError("Please log in to view your profile.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load your profile.");
        }
        return response.json();
      })
      .then((data) => {
        setUser({
          name: data.name || "",
          email: data.email || "",
          role: data.role || "USER",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  if (loading) return <p>Loading profile...</p>;

  if (error) {
    return (
      <div className="mx-auto max-w-xl p-8">
        <p>{error}</p>
        <a href="/login" className="underline">
          Go to login
        </a>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

      <section className="space-y-4 rounded-lg border p-6">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg">{user.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Account Type</p>
          <p className="text-lg">{user.role}</p>
        </div>

        <a href="/orders" className="inline-block underline">
          View My Orders
        </a>

        <div>
          <button
            onClick={logout}
            className="rounded bg-black px-5 py-2 text-white"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}