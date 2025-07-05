// src/components/AnimatedToggle.jsx
import { motion } from "framer-motion";

const AnimatedToggle = ({ isOpen }) => {
  return (
    <div className="w-8 h-8 flex flex-col justify-center items-center cursor-pointer">
      <motion.div
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className="w-6 h-0.5 bg-black mb-1"
      />
      <motion.div
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="w-6 h-0.5 bg-black mb-1"
      />
      <motion.div
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className="w-6 h-0.5 bg-black"
      />
    </div>
  );
};

export default AnimatedToggle;
