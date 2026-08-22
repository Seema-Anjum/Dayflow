import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  User,
  CalendarCheck,
  CalendarDays,
  Wallet,
  CircleDollarSign,
  LogOut,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/employee/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Profile",
    path: "/employee/profile",
    icon: User,
  },
  {
    name: "Attendance",
    path: "/employee/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Leave",
    path: "/employee/leaves",
    icon: CalendarDays,
  },
  {
    name: "Salary",
    path: "/employee/salary",
    icon: CircleDollarSign,
  },
  {
    name: "Payroll",
    path: "/employee/payroll",
    icon: Wallet,
  },
];

export default function EmployeeLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <aside className="w-64 bg-white border-r p-5">

        <h1 className="text-2xl font-bold mb-1">
          Dayflow
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Employee Portal
        </p>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={18} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-10 pt-5 border-t">

          <p className="font-medium">
            {user?.name}
          </p>

          <p className="text-sm text-gray-500">
            Employee
          </p>

          <button
            onClick={logout}
            className="flex items-center gap-2 mt-5 text-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </aside>

      <main className="flex-1">

        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="font-semibold">
            Employee Portal
          </h2>

          <div className="text-sm text-gray-500">
            {user?.loginId}
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>

      </main>

    </div>
  );
}