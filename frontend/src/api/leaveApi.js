import api from "./axios";
export const applyLeave=async(p)=>(await api.post("/leaves",p)).data;
export const getMyLeaves=async()=>(await api.get("/leaves/my")).data;
export const getAllLeaves=async()=>(await api.get("/leaves")).data;
export const approveLeave=async(id,c="")=>(await api.put(`/leaves/${id}/approve`,{adminComment:c})).data;
export const rejectLeave=async(id,c="")=>(await api.put(`/leaves/${id}/reject`,{adminComment:c})).data;