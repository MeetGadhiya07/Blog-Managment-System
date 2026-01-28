'use client';

import { FileText, LayoutDashboard, Settings, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/blogs', label: 'Blogs', icon: FileText },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-muted flex h-dvh overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`bg-primary fixed inset-y-0 left-0 z-50 flex w-64 flex-col text-white shadow-lg transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-primary-hover flex items-center justify-between border-b p-4 sm:p-6">
          <h2 className="text-lg font-bold sm:text-xl">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="hover:bg-primary-hover rounded-lg p-2 text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3 sm:p-4">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors sm:px-4 sm:py-3 ${
                  isActive
                    ? 'bg-primary-hover text-white'
                    : 'hover:bg-primary-hover text-gray-300 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium sm:text-base">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="border-border sticky top-0 z-30 flex items-center justify-between border-b bg-white p-4 shadow-sm sm:p-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-foreground hover:bg-muted rounded-lg p-2 lg:hidden"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1 lg:flex-none" />
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-foreground text-sm font-medium">John Doe</p>
              <p className="text-secondary text-xs">Admin</p>
            </div>
            <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white">
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
