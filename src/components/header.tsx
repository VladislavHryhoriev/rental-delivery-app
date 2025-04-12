"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarCheck, FaHourglassEnd } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const navigation = [
  {
    name: "Активные",
    href: "/orders/process",
    icon: <FaHourglassEnd />,
  },
  {
    name: "Завершенные",
    href: "/orders/completed",
    icon: <FaCalendarCheck />,
  },
  {
    name: "New Delivery",
    href: "/orders/create-order",
    icon: <FaCirclePlus />,
  },
];

const Header = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  return (
    <div className="mx-auto max-w-[768px] text-white">
      <header className="bg-gray-800/50 p-4 text-2xl text-indigo-50 shadow-lg">
        <nav className="flex justify-between">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-lg px-8 py-2 transition-all hover:bg-gray-800",
                path === item.href && "bg-gray-800",
              )}
            >
              {item.icon}
            </Link>
          ))}

          {/* <Link href="/sign" className="rounded-sm bg-red-900 px-8 py-2">
            <BiLogIn />
            <BiLogOut />
          </Link> */}
        </nav>
      </header>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Header;
