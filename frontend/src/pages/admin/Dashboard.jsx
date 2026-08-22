import { useEffect, useState } from "react";
import StatCard from "../../components/StatCard";
import { getAdminDashboard } from "../../api/dashboardApi";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await getAdminDashboard();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!data) {
    return <p>Unable to load dashboard.</p>;
  }

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Overview of your organization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Total Employees"
          value={data.employees.total}
          description="All employees"
        />

        <StatCard
          title="Present Today"
          value={data.attendance.presentToday}
          description="Today's attendance"
        />

        <StatCard
          title="On Leave"
          value={data.attendance.leaveToday}
          description="Employees on leave"
        />

        <StatCard
          title="Pending Leaves"
          value={data.leaves.pending}
          description="Awaiting approval"
        />

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg">
            Employee Overview
          </h2>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between">
              <span>Active</span>
              <strong>
                {data.employees.active}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Inactive</span>
              <strong>
                {data.employees.inactive}
              </strong>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-semibold text-lg">
            Payroll Overview
          </h2>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between">
              <span>Employees</span>
              <strong>
                {data.payroll.totalEmployees}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Gross Salary</span>
              <strong>
                ₹{data.payroll.totalGrossSalary}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Net Salary</span>
              <strong>
                ₹{data.payroll.totalNetSalary}
              </strong>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}