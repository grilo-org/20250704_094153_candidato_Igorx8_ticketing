"use client";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";

function Header() {
  const { currentUser } = useUser();

  const links = [
    !currentUser && { href: "/auth/signin", label: "Sign In" },
    !currentUser && { href: "/auth/signup", label: "Sign Up" },
    currentUser && { href: "/auth/signout", label: "Sign Out" },
  ]
    .filter((linkConfig) => !!linkConfig)
    .map(({ href, label }) => {
      return (
        <Link key={href} href={href} className="text-gray-300 hover:text-white">
          {label}
        </Link>
      );
    });

  return (
    <nav className="bg-gray-800 p-4">
      <Link href="/" className="text-white text-lg font-bold">
        EasyTickets
      </Link>

      <ul className="flex space-x-4">{links}</ul>
    </nav>
  );
}

export default Header;
