import {useEffect,useMemo,useState} from "react";import {Link} from "react-router-dom";import {Plus,Search,Eye} from "lucide-react";import {getEmployees,createEmployee} from "../../api/employeeApi";import Modal from "../../components/Modal";import Badge from "../../components/Badge";import Loading from "../../components/Loading";

const blank={name:"",email:"",phone:"",department:"",jobPosition:"",role:"EMPLOYEE"};

export default function Employees(){
  const[items,setItems]=useState([]),[q,setQ]=useState(""),[open,setOpen]=useState(false),[form,setForm]=useState(blank),[loading,setLoading]=useState(true),[error,setError]=useState("");
  const load=()=>getEmployees().then(d=>setItems(d.employees||d.data||d||[])).catch(e=>setError(e.response?.data?.message||"Failed to load")).finally(()=>setLoading(false));
  useEffect(()=>{load()},[]);
  const filtered=useMemo(()=>items.filter(x=>JSON.stringify(x).toLowerCase().includes(q.toLowerCase())),[items,q]);
  const submit=async e=>{e.preventDefault();try{await createEmployee(form);setOpen(false);setForm(blank);load()}catch(e){setError(e.response?.data?.message||"Failed to create")}};
  if(loading)return <Loading/>;

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold text-[var(--color-ink-900)]">Employees</h1>
          <p className="text-[var(--color-ink-600)]">Manage employee records.</p>
        </div>
        <button onClick={()=>setOpen(true)} className="btn-primary"><Plus size={17}/>Add Employee</button>
      </div>

      {error&&<div className="badge badge-bad w-full !justify-start !rounded-xl !py-2.5 !px-3.5 text-sm font-medium">{error}</div>}

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)]" size={18}/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="input pl-10"/>
      </div>

      <div className="card overflow-x-auto">
        <table className="table-modern">
          <thead><tr><th>Name</th><th>Login ID</th><th>Department</th><th>Position</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map(x=>(
              <tr key={x._id}>
                <td className="font-medium">{x.name||"--"}</td>
                <td>{x.loginId||"--"}</td>
                <td>{x.department||"--"}</td>
                <td>{x.jobPosition||"--"}</td>
                <td><Badge>{x.isActive===false?"INACTIVE":"ACTIVE"}</Badge></td>
                <td><Link to={`/admin/employees/${x._id}`} className="inline-flex items-center gap-1 text-[var(--color-brand-600)] hover:underline"><Eye size={15}/>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={open} title="Create Employee" onClose={()=>setOpen(false)}>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
          {["name","email","phone","department","jobPosition"].map(k=>(
            <label key={k} className="block">
              <span className="field-label capitalize">{k}</span>
              <input required={k==="name"||k==="email"} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="input"/>
            </label>
          ))}
          <button className="btn-primary sm:col-span-2">Create</button>
        </form>
      </Modal>
    </div>
  );
}