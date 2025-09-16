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
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpenId(null);
      }
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const content = (
    <motion.div
      initial={{
        display: "none",
      }}
      variants={{
        show: {
          display: "flex",
        },
        hide: {
          display: "none",
        },
      }}
      animate={openId === id ? "show" : "hide"}
      className="fixed z-30 backdrop-blur-sm top-0 left-0 right-0 bottom-0 min-h-screen min-w-screen flex items-center justify-center bg-black/60"
    >
      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
        }}
        variants={{
          show: {
            scale: 1,
            opacity: 1,
          },
          hide: {
            scale: 0,
            opacity: 0,
          },
        }}
        animate={openId === id ? "show" : "hide"}
        transition={{
          duration: 0.4,
          ease: "easeOut",
          delay: 0,
        }}
        className="cursor-auto mt-1 border border-slate-700/50 w-full rounded-3xl bg-slate-800/90 px-6 py-2 max-w-xl"
        ref={popoverRef}
      >
        {children}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpenId(id)}
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
