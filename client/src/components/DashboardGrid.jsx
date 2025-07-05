// src/components/DashboardGrid.jsx
const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">

      {/* Mentor Discovery */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Mentor Discovery</h3>
        <div className="flex space-x-2 overflow-x-auto">
          {[1, 2, 3, 4].map((_, idx) => (
            <div key={idx} className="min-w-[120px] bg-pink-50 p-2 rounded-lg text-center">
              <img
                src="https://via.placeholder.com/60"
                alt="mentor"
                className="rounded-full mx-auto mb-1"
              />
              <p className="text-sm font-medium">Maria B.</p>
              <p className="text-xs text-gray-500">Data Science</p>
              <button className="mt-1 bg-pink-400 text-white text-xs px-2 py-1 rounded">Request</button>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Upcoming Sessions</h3>
        <p className="text-sm">Apr 25 - Sandra W. - 10:00 AM</p>
        <button className="mt-2 bg-green-400 text-white px-3 py-1 rounded text-sm">Join</button>
      </div>

      {/* Saved Mentors */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Saved Mentors</h3>
        <p className="text-sm">Alicia P. - Available</p>
        <p className="text-sm">Ciara M. - Available</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Quick Actions</h3>
        <div className="flex flex-col gap-2">
          <button className="bg-blue-400 text-white px-3 py-1 rounded text-sm">Book Session</button>
          <button className="bg-purple-400 text-white px-3 py-1 rounded text-sm">Ask Chatbot</button>
          <button className="bg-gray-400 text-white px-3 py-1 rounded text-sm">Update Profile</button>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Calendar</h3>
        <input type="date" className="border rounded-md p-2 w-full" />
        <button className="mt-2 bg-pink-400 text-white px-3 py-1 rounded text-sm w-full">Add Appointment</button>
      </div>

    </div>
  );
};

export default DashboardGrid;
