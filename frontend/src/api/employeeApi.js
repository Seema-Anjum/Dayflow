import api from "./axios";
export const getEmployees=async()=>(await api.get("/employees")).data;
export const getEmployee=async(id)=>(await api.get(`/employees/${id}`)).data;
export const createEmployee=async(p)=>(await api.post("/employees",p)).data;
export const updateEmployee=async(id,p)=>(await api.put(`/employees/${id}`,p)).data;