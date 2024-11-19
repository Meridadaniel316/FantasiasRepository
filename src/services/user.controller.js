const User = require("../models/User");
const Student = require("../models/Student");
const Role = require("../models/Rol");
const config = require("../config");
const tkn = require("jsonwebtoken");

const newStudent = require("./useCases/user/newStudent");
const newUser = require("./useCases/user/newUser");
const findStudentBy = require("./useCases/user/findStudentBy");
const findStudentByNameOrDocument = require("./useCases/user/findStudentByNameOrDocument");

const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      roles,
      image,
      token,
      name,
      lastname,
      genero,
      nacimiento,
      documento,
      celular,
      tipodocumento,
    } = req.body;

    const emailMin = email.toLowerCase();
    const newUser = new User({
      username,
      name,
      lastname,
      genero,
      nacimiento,
      email: emailMin,
      password: await User.encryptPassword(password),
      token,
      image,
      documento,
      celular,
      tipodocumento,
    });
    if (!token) {
      newUser.token = tkn.sign({ id: newUser._id }, config.SECRET, {
        expiresIn: 43200,
      });
    }
    if (!image) {
      newUser.image = config.ImageProfileUndefined;
    }
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    return res.status(200).json(savedUser);
  } catch (error) {
    console.error(error);
  }
};
const createStudent = async (req, res) => {
  try {
    const {
      gradomatricula,
      gradoinforme,
      estudiante,
      niup,
      fechanto,
      rh,
      telfijo,
      padre,
      madre,
      direccion,
      status,
    } = req.body;
    const userFound = await User.find({ email: { $in: padre } });
    // creating a new User
    const student = new Student({
      gradomatricula,
      gradoinforme,
      estudiante,
      niup,
      fechanto,
      rh,
      telfijo,
      padre: userFound.map((padr) => padr._id),
      madre: userFound.map((madr) => madr._id),
      direccion,
      status,
    });
    if (padre) {
      const foundUsers = await User.find({ email: { $in: padre } });
      student.padre = foundUsers.map((padre) => padre.id);
    }
    if (madre) {
      const foundUsers = await User.find({ email: { $in: madre } });
      student.madre = foundUsers.map((madre) => madre.id);
    }
    // saving the new user
    const savedStudent = await student.save();

    return res.status(200).json(savedStudent);
  } catch (error) {
    console.error(error);
  }
};

const renderUsers = async (req, res) => {
  const users = await User.find().populate("roles");
  const roles = await Role.find();
  const rolUser = await Role.find({ _id: { $in: req.user.roles } });

  //const user = await User.findByIdAndUpdate(users._id, {token: token}, { new: true }).populate("roles");
  const pagename = { name: "users", title: "Usuarios" };
  res.render("dashboard/users", {
    layout: "dashboard",
    config,
    users,
    rolUser,
    roles,
    pagename,
  });
};
const renderStudents = async (req, res) => {
  const students = await findStudentBy();
  const users = await User.find();
  const roles = await Role.find();
  const rolUser = await Role.find({ _id: { $in: req.user.roles } });
  const pagename = { name: "students", title: "Estudiantes" };
  res.render("dashboard/students", {
    layout: "dashboard",
    config,
    users,
    students,
    rolUser,
    roles,
    pagename,
  });
};

const matricularNuevoEstudiante = async (req, res) => {
  const padre = await newUser(
    null,
    req.body.nameDaddy,
    req.body.lastNameDaddy,
    req.body.directionDaddy,
    req.body.occupationDaddy,
    req.body.generoDaddy,
    req.body.telDaddy,
    req.body.nacimientoDaddy,
    req.body.tipodocumentotdocumentoDaddy,
    req.body.documentoDaddy,
    req.body.emailDaddy,
    req.body.theDaddyStaysWithTheSon
  );
  const madre = await newUser(
    null,
    req.body.nameMother,
    req.body.lastNameMother,
    req.body.directionMother,
    req.body.occupationMother,
    req.body.generoMother,
    req.body.telMother,
    req.body.nacimientoMother,
    req.body.tipodocumentotdocumentoMother,
    req.body.documentoMother,
    req.body.emailMother,
    req.body.theMotherStaysWithTheSon
  );
  const newStudentMatriculado = await newStudent(req.body)

  console.log(newStudentMatriculado)

  req.flash('message', 'EL SISTEMA SE ENCUENTRA EN CONSTRUCCIÓN, POR FAVOR PONERSE EN CONTACTO CON ADMINISTRACIÓN')

  return res.redirect('/matricula');
};

const searchregistrationinformation = async (req, res) => {
  req.flash("studentName", req.body.nombreEstudiante);
  req.flash("studentDocument", req.body.documentoEstudiante);
  req.flash("madreDocument", req.body.documentoMadre);
  req.flash("padreDocument", req.body.documentoPadre);
  req.flash("formulario", true);

  return res.redirect("/matricula");
};

const renderStudentEnrollmentInfo = async (req, res) => {
  const valor = res.locals.message;
  const studentName = await findStudentByNameOrDocument(
    valor.studentName,
    valor.studentDocument
  );
  this.documentPadre = valor.madreDocument;
  let madreDocument = await User.find({
    documento: { $in: valor.madreDocument },
  }).limit(1);
  let padreDocument = await User.find({
    documento: { $in: valor.padreDocument },
  }).limit(1);

  madreDocument.map((user) => {
    if(user.firststart){
      madreDocument = null
      valor.madreDocument = null
    }
  })

  padreDocument.map((user) => {
    if(user.firststart){
      padreDocument = null
      valor.padreDocument = null
    }
  })

  const pagename = { name: "matriculas", title: "Registro matricula" };
  if (valor.formulario) {
    res.render("enrollmet/studentEnrollmentInfo", {
      layout: "enrollment",
      config,
      pagename,
      studentName,
      madreDocument,
      padreDocument,
    });
  } else {
    res.render("enrollmet/studentEnrollment", {
      layout: "enrollment",
      config,
      pagename,
    });
  }
};

module.exports = {
  createUser,
  createStudent,
  renderUsers,
  renderStudents,
  renderStudentEnrollmentInfo,
  searchregistrationinformation,
  matricularNuevoEstudiante,
};
