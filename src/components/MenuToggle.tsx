import { motion } from "framer-motion";

const Path = (props: any) => (
  <motion.path
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    className="stroke-current text-black dark:text-white"
    {...props}
  />
);

export const MenuToggle = ({ toggle }: { toggle: any }) => (
  <button onClick={toggle} className="md:hidden toggle-button">
    <svg width="23" height="18" viewBox="0 0 23 18" preserveAspectRatio="none">
      <Path
        d="M 2 2.5 L 20 2.5"
        className="top"
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path d="M 2 9.423 L 20 9.423" opacity="1" className="middle" />
      <Path
        d="M 2 16.346 L 20 16.346"
        className="bottom"
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);
