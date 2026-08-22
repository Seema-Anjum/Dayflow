import api from "./axios";
export const getMySalary=async()=>(await api.get("/salary/my")).data;
export const getEmployeeSalary=async(id)=>(await api.get(`/salary/employee/${id}`)).data;
export const updateEmployeeSalary=async(id,p)=>(await api.put(`/salary/employee/${id}`,p)).data;