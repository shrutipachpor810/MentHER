import { motion } from "framer-motion";

export default function SidebarToggle({ isOpen, toggleSidebar }) {
  return (
    <button
      onClick={toggleSidebar}
      className="relative w-8 h-8 flex flex-col justify-between items-center z-50 focus:outline-none"
    >
      <motion.span
        className="block w-8 h-0.5 bg-[#42383B]"
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.span
        className="block w-8 h-0.5 bg-[#42383B]"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block w-8 h-0.5 bg-[#42383B]"
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </button>
  );
}
