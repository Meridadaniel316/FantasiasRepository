const Student = require("../../../models/Student");

module.exports = (studentName, studentDocument) => {
  return Student.find({
    $or: [
      {
        estudiante: { $in: studentName },
      },
      {
        niup: { $in: studentDocument },
      },
    ],
  })
    .populate(["padre", "madre"])
    .limit(1);
};
