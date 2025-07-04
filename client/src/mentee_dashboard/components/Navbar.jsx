// src/components/Navbar.jsx
const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      <div>
  <h2 className="text-lg font-semibold">{greeting}, {name}!</h2>
  <p className="text-sm text-gray-500">Empowering women in tech, one connection at a time.</p>
</div>

      <input
        type="text"
        placeholder="Search mentors, topics..."
        className="border rounded-md px-3 py-1 text-sm w-64"
      />
    </div>
  );
};

export default Navbar;
