import { useState, useEffect } from "react";

const MentorProfile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        setName(data.name || "");
        setBio(data.bio || "");
        setSkills(data.skills ? data.skills.join(", ") : "");
      } catch (error) {
        console.error("Failed to load mentor profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5000/api/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          bio,
          skills: skills.split(',').map(s => s.trim()),
        }),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (response.ok) {
        alert('Profile updated!');
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating profile');
    }
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Manage your mentor profile — update your name, qualification, bio, and skills.
      </p>

      <div className="p-4 bg-gray-100 rounded space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

      

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short bio..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
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

export default MentorProfile;
