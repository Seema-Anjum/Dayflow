export const calculatePayroll = ({
  basicSalary,
  allowances,
  deductions,
  workingDays,
  presentDays,
  leaveDays,
  absentDays,
}) => {
  const grossSalary = basicSalary + allowances;

  const totalDaysAccounted =
    presentDays + leaveDays + absentDays;

  const dailySalary =
    workingDays > 0
      ? basicSalary / workingDays
      : 0;

  const unpaidDeduction =
    absentDays * dailySalary;

  const totalDeductions =
    deductions + unpaidDeduction;

  const netSalary =
    grossSalary - totalDeductions;

  return {
    grossSalary: Number(grossSalary.toFixed(2)),
    totalDeductions: Number(totalDeductions.toFixed(2)),
    netSalary: Number(netSalary.toFixed(2)),
  };
};