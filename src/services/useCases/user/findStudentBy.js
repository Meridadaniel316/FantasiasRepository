const Student = require("../../../models/Student");

module.exports = (id = null) => {
  if(id == null){
    return Student.find().populate(["padre", "madre"]);
  }
  return Student.findById(id).populate(["padre", "madre"]);
};
