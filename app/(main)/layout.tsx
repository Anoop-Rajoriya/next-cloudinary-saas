"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  HomeIcon,
  LayoutDashboardIcon,
  Share2Icon,
  VideoIcon,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";

const NavLinks = [
  { name: "Home", path: "/", icon: HomeIcon },
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboardIcon },
  { name: "Social Share", path: "/social-share", icon: Share2Icon },
  { name: "Upload Video", path: "/video-upload", icon: VideoIcon },
];

function MainLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const locationName = NavLinks.filter((link) => link.path === pathName)[0]
    .name;
  return (
    <main className="min-h-screen drawer">
      <input id="drawer-controller" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex">
        <Aside className="hidden lg:flex" />

        <div className="flex-1 flex flex-col">
          <header className="h-14 px-4 flex items-center justify-between border-b border-base-300">
            <div className="lg:hidden flex items-center gap-2">
              <label
                htmlFor="drawer-controller"
                className="btn btn-square btn-ghost"
              >
                <MenuIcon />
              </label>
              <Logo />
            </div>
            <span className="hidden lg:inline-block font-bold text-lg">
              {locationName}
            </span>
            <ThemeController className="ml-auto" />
          </header>

          <div className="p-4">{children}</div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div className="drawer-side">
        <label htmlFor="drawer-controller" className="drawer-overlay"></label>
        <Aside className="w-64 bg-base-200" />
      </div>
    </main>
  );
}

function Aside({ className }: { className?: string }) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  function handleLogout() {
    signOut();
    router.push("/");
  }

  return (
    <aside
      className={`${className} flex flex-col h-full border-r border-base-300`}
    >
      {/* LOGO */}
      <div className="h-14 flex items-center px-4 border-b border-base-300">
        <Logo />
      </div>

      {/* NAVIGATION */}
      <ul className="menu p-2 flex-1">
        {NavLinks.map(({ name, path }) => (
          <li key={path}>
            <Link
              href={path}
              className={pathname === path ? "active font-semibold" : ""}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>

      {/* USER FOOTER */}
      <div className="p-4 border-t border-base-300">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-sm">
            <p className="font-medium">{user?.fullName}</p>
            <p className="opacity-70">{user?.username}</p>
          </div>
        </div>

        <button onClick={handleLogout} className="btn btn-error btn-sm w-full">
          <LogOutIcon size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`font-bold text-lg ${className}`}>
      Next <span className="text-primary">Cloudy</span>
    </Link>
  );
}

function ThemeController({ className }: { className?: string }) {
  return (
    <label className="flex cursor-pointer gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <input
        type="checkbox"
        value="synthwave"
        className="toggle theme-controller"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
  );
}

export default MainLayout;
