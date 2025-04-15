"use client";
import clsx from "clsx";
import { CalendarCheck, CirclePlus, Hourglass } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Активні", href: "/orders/process", icon: <Hourglass /> },
  { name: "Завершені", href: "/orders/completed", icon: <CalendarCheck /> },
  { name: "Нова доставка", href: "/orders/create", icon: <CirclePlus /> },
];

const Header = () => {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-gray-900">
      <nav className="mx-auto max-w-screen-md">
        <div className="grid grid-cols-3 items-center justify-between">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col items-center gap-1 px-6 py-2",
                path === item.href
                  ? "bg-red-500/90 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white",
              )}
            >
              <span className="">{item.icon}</span>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
