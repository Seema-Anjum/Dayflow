import { useEffect, useState } from "react";
import StatCard from "../../components/StatCard";
import { getEmployeeDashboard } from "../../api/dashboardApi";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await getEmployeeDashboard();
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

  const attendance = data.attendance;

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="text-gray-500">
          Here's your Dayflow overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <StatCard
          title="Today's Attendance"
          value={
            attendance
              ? attendance.status
              : "Not Marked"
          }
        />

        <StatCard
          title="Leave Requests"
          value={data.leaves.length}
          description="Recent requests"
        />

        <StatCard
          title="Payroll Records"
          value={data.payroll.length}
          description="Available records"
        />

      </div>

      <div className="bg-white border rounded-xl p-6 mt-6">

        <h2 className="font-semibold text-lg">
          Today's Attendance
        </h2>

        {attendance ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>
              <p className="font-semibold mt-1">
                {attendance.status}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Check In
              </p>
              <p className="font-semibold mt-1">
                {attendance.checkIn
                  ? new Date(
                      attendance.checkIn
                    ).toLocaleTimeString()
                  : "--"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Check Out
              </p>
              <p className="font-semibold mt-1">
                {attendance.checkOut
                  ? new Date(
                      attendance.checkOut
                    ).toLocaleTimeString()
                  : "--"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Hours
              </p>
              <p className="font-semibold mt-1">
                {attendance.totalHours || 0}
              </p>
            </div>

          </div>
        ) : (
          <p className="text-gray-500 mt-4">
            You haven't checked in today.
          </p>
        )}

      </div>

    </div>
  );
}