import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  Wallet,
  CircleDollarSign,
  LogOut,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Employees",
    path: "/admin/employees",
    icon: Users,
  },
  {
    name: "Attendance",
    path: "/admin/attendance",
    icon: CalendarCheck,
  },
  {
    name: "Leaves",
    path: "/admin/leaves",
    icon: CalendarDays,
  },
  {
    name: "Payroll",
    path: "/admin/payroll",
    icon: Wallet,
  },
  {
    name: "Salary",
    path: "/admin/salary",
    icon: CircleDollarSign,
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <aside className="w-64 bg-white border-r min-h-screen p-5">

        <div className="mb-8">
          <h1 className="text-2xl font-bold">Dayflow</h1>
          <p className="text-sm text-gray-500">
            HR Management
          </p>
        </div>

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
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-gray-500">
            {user?.role}
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
          <h2 className="font-semibold">Dayflow</h2>

          <div className="text-sm text-gray-600">
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