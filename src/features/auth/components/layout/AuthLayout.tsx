import React from "react";
import GridShape from "@/shared/components/ui/grid-shape";
import { ThemeToggleFloating } from "@/shared/components/ui/theme";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="flex-shrink-0 items-center hidden w-full h-full lg:w-1/2 bg-rentbq-dark-blue dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <p className="text-center text-gray-400 dark:text-white/60">
                Rent Cam is a platform for renting out your cameras to others
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeToggleFloating />
        </div>
      </div>
    </div>
  );
}
