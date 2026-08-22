import {useEffect,useState} from "react";
import {Clock3,CalendarDays,Wallet} from "lucide-react";
import {getEmployeeDashboard} from "../../api/dashboardApi";
import {useAuth} from "../../context/AuthContext";
import StatCard from "../../components/StatCard";
import Loading from "../../components/Loading";
import Badge from "../../components/Badge";

export default function Dashboard(){
    const{user}=useAuth();
    const[data,setData]=useState(null);
    useEffect(()=>{getEmployeeDashboard().then(setData).catch(console.error)},[]);if(!data)return <Loading/>;
    const a=data.attendance;
    return 
    <div className="space-y-6"><div><h1 className="text-3xl font-bold">Welcome, {user?.name||user?.loginId}</h1><p className="text-slate-500">Your Dayflow overview</p></div><div className="grid gap-4 md:grid-cols-3"><StatCard title="Today's Attendance" value={a?.status||"Not Marked"} icon={Clock3}/><StatCard title="Leave Requests" value={data.leaves?.length||0} icon={CalendarDays}/><StatCard title="Payroll Records" value={data.payroll?.length||0} icon={Wallet}/></div><div className="rounded-2xl border bg-white p-6"><h2 className="font-semibold">Today's Attendance</h2>{a?<div className="mt-5 grid gap-5 sm:grid-cols-4"><div><p className="text-xs text-slate-500">Status</p><Badge>{a.status}</Badge></div><div><p className="text-xs text-slate-500">Check In</p><b>{a.checkIn?new Date(a.checkIn).toLocaleTimeString():"--"}</b></div><div><p className="text-xs text-slate-500">Check Out</p><b>{a.checkOut?new Date(a.checkOut).toLocaleTimeString():"--"}</b></div><div><p className="text-xs text-slate-500">Hours</p><b>{a.totalHours||0}</b></div></div>:<p className="mt-4 text-sm text-slate-500">No attendance recorded today.</p>}</div></div>}