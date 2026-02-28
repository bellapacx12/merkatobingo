"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, User, Zap } from "lucide-react";
import { useBottomNav } from "@/context/BottomNavContext";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "Games" },
  { href: "/tasks", icon: Zap, label: "Tasks" },
  { href: "/wallet", icon: Wallet, label: "Wallet" },
  { href: "/profile", icon: User, label: "Profile" },
];

export default function BottomNav() {
  const { isVisible } = useBottomNav();
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50 backdrop-blur-md bg-black/30 border-t border-white/10"
        >
          <div className="flex justify-around py-2">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col items-center text-xs"
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-white" : "text-gray-400"}
                  />
                  <span className={isActive ? "text-white" : "text-gray-400"}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
