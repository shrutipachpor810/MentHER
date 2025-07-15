// src/mentee_dashboard/pages/MenteeProfile.jsx

import { useState, useEffect } from "react";

const MenteeProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setName(data.name || "");
        setBio(data.bio || "");
        setSkills(data.skills ? data.skills.join(", ") : "");
        setProfilePic(data.profilePic || "");

        // ✅ Save to localStorage for ProfileCorner
        if (data.profilePic) {
          localStorage.setItem("profilePic", data.profilePic);
          window.dispatchEvent(new Event("storage"));
        }
        if (data.name) {
          localStorage.setItem("name", data.name);
        }
        if (data.email) {
          localStorage.setItem("email", data.email);
        }
      } catch (error) {
        console.error("Failed to load mentee profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          bio,
          skills: skills.split(",").map((s) => s.trim()),
        }),
      });

      const data = await response.json();
      console.log("Update response:", data);
      if (response.ok) {
        alert("Profile updated!");

        if (data.name) {
          localStorage.setItem("name", data.name);
          window.dispatchEvent(new Event("storage"));
        }
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/users/upload-profile-pic`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      console.log("Upload response:", data);
      setProfilePic(data.profilePicUrl);

      // ✅ Save to localStorage for ProfileCorner
      localStorage.setItem("profilePic", data.profilePicUrl);
      window.dispatchEvent(new Event("storage"));

      alert("Profile picture uploaded!");
    } catch (error) {
      console.error(error);
      alert("Error uploading profile picture");
    }
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Manage your mentee profile — update your name, bio, skills, and profile picture.
      </p>

      <div className="p-4 bg-gray-100 rounded space-y-4">
        {/* Profile Picture */}
        <div className="flex items-center gap-4">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center text-3xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short bio..."
          ></textarea>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Comma-separated skills"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default MenteeProfile;
