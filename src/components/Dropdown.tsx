"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface DropdownProps {
  triggerElement: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function Dropdown(props: DropdownProps) {
  const { triggerElement, children, className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const hideDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {triggerElement}
      </button>

      <motion.div
        ref={dropdownRef}
        initial={{ scale: 0.9, opacity: 0 }}
        variants={{
          show: { scale: 1, opacity: 1 },
          hide: { scale: 0.9, opacity: 0 },
        }}
        animate={isOpen ? "show" : "hide"}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseLeave={hideDropdown}
        className={clsx(
          "absolute cursor-auto mt-2 border-[#2c2f4f] border rounded-xl bg-slate-700 top-full left-0 z-20 p-3 w-[20rem]",
          className
        )}
      >
        {children}
      </motion.div>
    </>
  );
}
