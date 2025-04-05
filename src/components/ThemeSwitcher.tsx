"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { RiMoonClearLine } from "react-icons/ri";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <div className="p-1 md:p-2 w-8 h-8 md:w-10 md:h-10 rounded-sm ">
        {theme === "dark" ? (
          <RiMoonClearLine className="text-2xl" />
        ) : (
          <IoSunnyOutline className="text-2xl" />
        )}
      </div>
    </button>
  );
}
