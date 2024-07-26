"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTools } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const navigation = [
  {
    id: 0,
    name: "Delivery List",
    href: "/delivery-list",
    icon: <FaTools />,
  },
  {
    id: 1,
    name: "New Delivery",
    href: "/new-delivery",
    icon: <FaCirclePlus />,
  },
];

const Container = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  return (
    <div className="mx-auto text-white">
      <header className="bg-neutral-900 p-4 text-2xl text-indigo-50">
        <nav className="flex justify-between">
          {navigation.map((item) => (
            <Link
              key={item.id}
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

export default Container;
