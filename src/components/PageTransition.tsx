"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    setShowOverlay(true);
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {children}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[9999] bg-white transition-opacity duration-500 ease-out ${
          showOverlay ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}
