const processPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id);

    if (!payroll) {
      return res.status(404).json({
        success: false,
        message: "Payroll not found",
      });
    }

    if (payroll.status !== "DRAFT") {
      return res.status(400).json({
        success: false,
        message: "Payroll has already been processed",
      });
    }

    payroll.status = "PROCESSED";
    payroll.processedAt = new Date();

    await payroll.save();

    res.status(200).json({
      success: true,
      message: "Payroll processed successfully",
      payroll,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process payroll",
    });
  }
};

export default processPayroll;