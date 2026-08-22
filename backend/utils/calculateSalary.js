export const calculateSalary = (salary) => {
  const basic = salary.basicSalary;

  let totalAllowances = 0;
  let totalDeductions = 0;

  for (const allowance of salary.allowances) {
    if (allowance.type === "FIXED") {
      totalAllowances += allowance.value;
    } else {
      totalAllowances += (basic * allowance.value) / 100;
    }
  }

  for (const deduction of salary.deductions) {
    if (deduction.type === "FIXED") {
      totalDeductions += deduction.value;
    } else {
      totalDeductions += (basic * deduction.value) / 100;
    }
  }

  const grossSalary = basic + totalAllowances;

  const netSalary = grossSalary - totalDeductions;

  return {
    basicSalary: basic,
    totalAllowances,
    grossSalary,
    totalDeductions,
    netSalary,
  };
};