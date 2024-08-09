"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCalendarCheck, FaHourglassEnd } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const navigation = [
  {
    name: "Активные",
    href: "/process",
    icon: <FaHourglassEnd />,
  },
  {
    name: "Завершенные",
    href: "/completed",
    icon: <FaCalendarCheck />,
  },
  {
    name: "New Delivery",
    href: "/create-order",
    icon: <FaCirclePlus />,
  },
];

const Header = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  return (
    <div className="mx-auto max-w-[768px] text-white">
      <header className="bg-neutral-900 p-4 text-2xl text-indigo-50">
        <nav className="flex justify-between">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "rounded-md bg-red-900 px-8 py-2 active:bg-red-950",
                path === item.href && "bg-red-950",
              )}
            >
              {item.icon}
            </Link>
          ))}

          {/* <Link href="/sign" className="rounded-md bg-red-900 px-8 py-2">
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
