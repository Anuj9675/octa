'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, Sidebar } from '@/src/components';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Close sidebar by default on small screens (below 640px)
    if (window.innerWidth < 640) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <>
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        <main
          className={`mt-14 w-full transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'sm:ml-64' : ''
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
