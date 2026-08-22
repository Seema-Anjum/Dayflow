import {useEffect,useState} from "react";import {getAllLeaves,approveLeave,rejectLeave} from "../../api/leaveApi";import Loading from "../../components/Loading";import Badge from "../../components/Badge";import Modal from "../../components/Modal";

export default function Leaves(){
  const[items,setItems]=useState([]),[loading,setLoading]=useState(true),[selected,setSelected]=useState(null),[comment,setComment]=useState("");
  const load=()=>getAllLeaves().then(d=>setItems(d.leaves||[])).catch(console.error).finally(()=>setLoading(false));
  useEffect(()=>{load()},[]);
  const act=async type=>{try{if(type==="approve")await approveLeave(selected._id,comment);else await rejectLeave(selected._id,comment);setSelected(null);setComment("");load()}catch(e){alert(e.response?.data?.message||"Action failed")}};
  if(loading)return <Loading/>;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-bold text-[var(--color-ink-900)]">Leave Requests</h1>
        <p className="text-[var(--color-ink-600)]">Review employee leave.</p>
      </div>

      <div className="card overflow-x-auto">
        <table className="table-modern">
          <thead><tr><th>Employee</th><th>Type</th><th>Dates</th><th>Days</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {items.map(x=>(
              <tr key={x._id}>
                <td className="font-medium">{x.userId?.name||"--"}</td>
                <td>{x.leaveType}</td>
                <td>{new Date(x.startDate).toLocaleDateString()} – {new Date(x.endDate).toLocaleDateString()}</td>
                <td>{x.totalDays}</td>
                <td><Badge>{x.status}</Badge></td>
                <td>{x.status==="PENDING"&&<button onClick={()=>setSelected(x)} className="btn-secondary !px-3 !py-2 text-xs">Review</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!selected} title="Review Leave" onClose={()=>setSelected(null)}>
        <p className="text-sm text-[var(--color-ink-900)]">Employee: <b>{selected?.userId?.name}</b></p>
        <p className="mt-2 text-sm text-[var(--color-ink-600)]">Reason: {selected?.remarks||"—"}</p>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} className="input mt-4" rows="4" placeholder="Comment"/>
        <div className="mt-4 flex gap-3">
          <button onClick={()=>act("reject")} className="btn-danger flex-1">Reject</button>
          <button onClick={()=>act("approve")} className="btn-primary flex-1">Approve</button>
        </div>
      </Modal>
    </div>
  );
}