import api from "./axios";
export const getMyPayroll=async()=>(await api.get("/payroll/my")).data;
export const getAllPayroll=async()=>(await api.get("/payroll")).data;
export const generatePayroll=async(id,p)=>(await api.post(`/payroll/employee/${id}/generate`,p)).data;
export const processPayroll=async(id)=>(await api.put(`/payroll/${id}/process`)).data;