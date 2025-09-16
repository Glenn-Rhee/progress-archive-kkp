"use client";
import { usePopover } from "@/store/popover-store";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
interface PopoverProps {
  triggerElement: React.ReactNode;
  children: React.ReactNode;
}

export default function Popover(props: PopoverProps) {
  const { triggerElement, children } = props;
  const { openId, setOpenId } = usePopover();
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const popoverEl = popoverRef.current;
      const triggerEl = triggerRef.current;
      const target = event.target as Node;

      if (popoverEl && popoverEl.contains(target)) return;
      if (triggerEl && triggerEl.contains(target)) return;

      setOpenId(null);
    },
    [setOpenId]
  );

  useEffect(() => {
    if (openId) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [openId]);

  useEffect(() => {
    if (openId === id) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openId, id, handleClickOutside]);

  const content = (
    <motion.div
      initial={{ display: "none" }}
      variants={{
        show: { display: "flex" },
        hide: { display: "none" },
      }}
      animate={openId === id ? "show" : "hide"}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        ref={popoverRef}
        initial={{ scale: 0.8, opacity: 0 }}
        variants={{
          show: { scale: 1, opacity: 1 },
          hide: { scale: 0.8, opacity: 0 },
        }}
        animate={openId === id ? "show" : "hide"}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="cursor-auto border border-slate-700/50 w-full max-w-xl rounded-3xl bg-slate-800/90 px-6 py-5"
      >
        {children}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => {
          setOpenId(id);
        }}
        ref={triggerRef}
        className="cursor-pointer w-full"
      >
        {triggerElement}
      </button>

      {mounted && typeof window !== "undefined"
        ? createPortal(content, document.body)
        : null}
    </div>
  );
}
