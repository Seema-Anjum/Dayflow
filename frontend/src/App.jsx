import {Navigate,Route,Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import EmployeeDetails from "./pages/admin/EmployeeDetails";
import AdminAttendance from "./pages/admin/Attendance";
import AdminLeaves from "./pages/admin/Leaves";
import AdminPayroll from "./pages/admin/Payroll";
import AdminSalary from "./pages/admin/Salary";
import EmployeeDashboard from "./pages/employee/Dashboard";
import Profile from "./pages/employee/Profile";
import EmployeeAttendance from "./pages/employee/Attendance";
import EmployeeLeaves from "./pages/employee/Leaves";
import EmployeeSalary from "./pages/employee/Salary";
import EmployeePayroll from "./pages/employee/Payroll";

export default function App(){
return <Routes>
<Route path="/login" element={<Login/>}/>
<Route element={<ProtectedRoute roles={["ADMIN","HR"]}><AdminLayout/></ProtectedRoute>}>
<Route path="/admin/dashboard" element={<AdminDashboard/>}/>
<Route path="/admin/employees" element={<Employees/>}/>
<Route path="/admin/employees/:id" element={<EmployeeDetails/>}/>
<Route path="/admin/attendance" element={<AdminAttendance/>}/>
<Route path="/admin/leaves" element={<AdminLeaves/>}/>
<Route path="/admin/payroll" element={<AdminPayroll/>}/>
<Route path="/admin/salary" element={<AdminSalary/>}/>
</Route>
<Route element={<ProtectedRoute roles={["EMPLOYEE"]}><EmployeeLayout/></ProtectedRoute>}>
<Route path="/employee/dashboard" element={<EmployeeDashboard/>}/>
<Route path="/employee/profile" element={<Profile/>}/>
<Route path="/employee/attendance" element={<EmployeeAttendance/>}/>
<Route path="/employee/leaves" element={<EmployeeLeaves/>}/>
<Route path="/employee/salary" element={<EmployeeSalary/>}/>
<Route path="/employee/payroll" element={<EmployeePayroll/>}/>
</Route>
<Route path="/" element={<Navigate to="/login" replace/>}/>
<Route path="*" element={<Navigate to="/login" replace/>}/>
</Routes>}