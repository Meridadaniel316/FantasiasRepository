const Student = require("../../../models/Student");
const User = require("../../../models/User");

module.exports = async (body) => {
  const {
    studentStatus,
    gradeEnroll,
    typeModality,
    workingDay,
    lastYearStudied,
    lastInstitution,
    lateGrade,
    nameStudent,
    lastNameStudent,
    gender,
    niup,
    documentNumber,
    countryFile,
    direction,
    neighborhood,
    apartmentHouseNumber,
    housingType,
    municipality,
    departament,
    landline,
    eps,
    queryIps,
    bloodType,
    countryOfBirth,
    cityOfBirth,
    dateOfBirth,
    documentoDaddy,
    documentoMother
  } = body;
  const padreFound = await User.find({ documento: { $in: documentoDaddy } });
  const madreFound = await User.find({ documento: { $in: documentoMother } });
  const student = new Student({
    estadoEstudiante: studentStatus,
    gradomatricula: gradeEnroll,
    tipoModalidad: typeModality,
    tipoJornada: workingDay,
    gradoinforme: gradeEnroll,
    lastYearStudied,
    lastInstitution,
    lateGrade,
    estudiante: nameStudent+" "+lastNameStudent,
    genero: gender,
    niup,
    pasaporte: documentNumber,
    paisexpedicion: countryFile,
    rh: bloodType,
    telfijo: landline,
    padre: padreFound.map((padr) => padr._id),
    madre: madreFound.map((madr) => madr._id),
    direccion: direction,
    barrio: neighborhood,
    numCasaApart: apartmentHouseNumber,
    tipoVivienda: housingType,
    municipioCiudad: municipality,
    departamento: departament,
    eps,
    epsConsulta: queryIps,
    paisNacimiento: countryOfBirth,
    ciudadNacimiento: cityOfBirth,
    fechaNacimiento: dateOfBirth,
    status: '1',
  });
  if (documentoDaddy) {
    const foundUsers = await User.find({ documento: { $in: documentoDaddy } });
    student.padre = foundUsers.map((padre) => padre.id);
  }
  if (documentoMother) {
    const foundUsers = await User.find({ documento: { $in: documentoMother } });
    student.madre = foundUsers.map((madre) => madre.id);
  }
  const savedStudent = await student.save();
  return savedStudent;
};
