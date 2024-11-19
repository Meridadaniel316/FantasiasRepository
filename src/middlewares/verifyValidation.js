const product = require('../models/Product')
const categor = require('../models/Category')
const orders = require('../models/Orders');
const User = require('../models/User');

const validateNewProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, image } = req.body;
    const categories = await categor.find();
    const categoriesValidator = categories.map(categories => categories.name)

    //Name
    if (!name) {
      req.flash('message', 'Debe ingresar un nombre valido.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    if (name.length < 3) {
      req.flash('message', 'El nombre del producto debe ser superior a 3 caracteres.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    if (!isNaN(name)) {
      req.flash('message', 'El nombre no puede ser una cadena de caracter numerico.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    //Description
    if (!description) {
      req.flash('message', 'Debe ingresar una descripción valida.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    if (description.length < 5) {
      req.flash('message', 'La descripción debe ser superior a 5 caracteres.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    if (!isNaN(description)) {
      req.flash('message', 'La descripción no puede ser una cadena de caracter numerico.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    //Price
    if (!price) {
      req.flash('message', 'Debe ingresar un precio valido.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    if (isNaN(price)) {
      req.flash('message', 'Debe ingresar un precio numerico valido.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    //Categories
    if (!category) {
      req.flash('message', 'Debe ingresar una categoria valida.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    if (!categoriesValidator.includes(category)) {
      req.flash('message', 'La categoria no existe.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/admin/new-product');
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const validateNewCategory = (req, res, next) => {
  try {
    const { name, description } = req.body;

    //Name
    if (!name) {
      req.flash('error', 'Debe ingresar un nombre valido.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin/new-product');
    }
    if (name.length < 3) {
      req.flash('error', 'El nombre de la categoria debe ser superior a 3 caracteres.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin/new-product');
    }
    if (!isNaN(name)) {
      req.flash('error', 'El nombre no puede ser una cadena de caracter numerico.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin/new-product');
    }

    //Description
    if (!description) {
      req.flash('error', 'Debe ingresar una descripción valida.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin/new-product');
    }
    if (description.length < 5) {
      req.flash('error', 'La descripción debe ser superior a 5 caracteres.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin/new-product');
    }
    if (!isNaN(description)) {
      req.flash('error', 'El nombre no puede ser una cadena de caracter numerico.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin/new-product');
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
const validateEditCategory = (req, res, next) => {
  try {
    const { name, description, id } = req.body;

    //Name
    if (!name) {
      req.flash('error', 'Debe ingresar un nombre valido.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin-category/' + id);
    }
    if (name.length < 3) {
      req.flash('error', 'El nombre de la categoria debe ser superior a 3 caracteres.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin-category/' + id);
    }
    if (!isNaN(name)) {
      req.flash('error', 'El nombre no puede ser una cadena de caracter numerico.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin-category/' + id);
    }

    //Description
    if (!description) {
      req.flash('error', 'Debe ingresar una descripción valida.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin-category/' + id);
    }
    if (description.length < 5) {
      req.flash('error', 'La descripción debe ser superior a 5 caracteres.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin-category/' + id);
    }
    if (!isNaN(description)) {
      req.flash('error', 'El nombre no puede ser una cadena de caracter numerico.');
      req.flash('nameCategory', name);
      req.flash('descriptionCategory', description);
      return res.redirect('/admin-category/' + id);
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const validateNewUser = (req, res, next) => {
  try {
    const { username, email, password, passwordconfirmed, name, lastname, genero, nacimiento, documento, tel, tipodocumento } = req.body;

    const edad = calcularEdad(nacimiento)
    function calcularEdad(fecha) {
      var hoy = new Date();
      var cumpleanos = new Date(fecha);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    }
    //Name
    if (!name) {
      req.flash('message', 'Debe ingresar un nombre valido.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (name.length < 3) {
      req.flash('message', 'El nombre debe ser superior a 3 caracteres.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (!isNaN(name)) {
      req.flash('message', 'El nombre no puede ser una cadena de caracter numerico.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    //lastname

    if (!lastname) {
      req.flash('message', 'Debe ingresar un apellido valido.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (lastname.length < 3) {
      req.flash('message', 'El apellido debe ser superior a 3 caracteres.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (!isNaN(lastname)) {
      req.flash('message', 'El apellido no puede ser una cadena de caracter numerico.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    //UserName
    if (!username) {
      req.flash('message', 'Debe ingresar un username valido.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (username.length < 3) {
      req.flash('message', 'El username debe ser superior a 3 caracteres.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (!isNaN(username)) {
      req.flash('message', 'El username no puede ser una cadena de caracter numerico.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (!genero) {
      req.flash('message', 'Debe seleccionar un genero valido.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }


    //Tipo documento

    if (!tipodocumento) {
      req.flash('message', 'Debe ingresar un documento valido')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (!documento) {
      req.flash('message', 'Debe ingresar un documento valido')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (isNaN(documento)) {
      req.flash('message', 'El documento tiene que ser una cadena de caracter numerico.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    //Telefono
    if (!tel) {
      req.flash('message', 'Debe ingresar un telefono valido')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (isNaN(tel)) {
      req.flash('message', 'El telefono tiene que ser una cadena de caracter numerico.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (tel.length > 10) {
      req.flash('message', 'Debe ingresar un telefono valido')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }
    //nacimiento

    if (!nacimiento) {
      req.flash('message', 'Debe ingresar una fecha de nacimiento valida.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (nacimiento.length < 3) {
      req.flash('message', 'Debe ingresar una fecha de nacimiento valida')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (edad < 10) {
      req.flash('message', 'Tienes menos de 10 años, por lo que no puedes crear una cuenta')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }
    //email
    if (!email) {
      req.flash('message', 'Debe ingresar un email valido.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }
    if (!validar_email(email)) {
      req.flash('message', 'Debe ingresar un gmail valido (@gmail.com)')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    //Password
    if (!password) {
      req.flash('message', 'Debe ingresar una contraseña valida.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }
    if (!validar_password(password)) {
      req.flash('message', 'Contraseña erronea: Minimo 8 caracteres - ' +
        'Maximo 15 - ' +
        'Al menos una letra mayúscula - ' +
        'Al menos una letra minucula - ' +
        'Al menos un dígito - ' +
        'No espacios en blanco - ' +
        'Al menos 1 caracter especial')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }
    if (!passwordconfirmed) {
      req.flash('message', 'Debe ingresar una confirmación de la contraseña.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }

    if (password != passwordconfirmed) {
      req.flash('message', 'Las contraseñas no coinciden.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('tel', tel)
      return res.redirect('/signup');
    }


    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const validateUpdateNewUser = (req, res, next) => {
  try {
    const { username, email, name, lastname, genero, nacimiento, documento, celular, tipodocumento } = req.body;
    const edad = calcularEdad(nacimiento)
    function calcularEdad(fecha) {
      var hoy = new Date();
      var cumpleanos = new Date(fecha);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    }
    //Name
    if (!name) {
      req.flash('message', 'Debe ingresar un nombre valido.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    if (name.length < 3) {
      req.flash('message', 'El nombre debe ser superior a 3 caracteres.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    if (!isNaN(name)) {
      req.flash('message', 'El nombre no puede ser una cadena de caracter numerico.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    //APELLIDO

    if (lastname) {
      if (lastname.length < 3) {
        req.flash('message', 'El apellido debe ser superior a 3 caracteres.')
        req.flash('username', username)
        req.flash('email', email)
        req.flash('name', name)
        req.flash('lastname', lastname)
        req.flash('genero', genero)
        req.flash('nacimiento', nacimiento)
        req.flash('tdocumento', tipodocumento)
        req.flash('documento', documento)
        req.flash('celular', celular)
        return res.redirect('/dashboard');
      }

      if (!isNaN(lastname)) {
        req.flash('message', 'El apellido no puede ser una cadena de caracter numerico.')
        req.flash('username', username)
        req.flash('email', email)
        req.flash('name', name)
        req.flash('lastname', lastname)
        req.flash('genero', genero)
        req.flash('nacimiento', nacimiento)
        req.flash('tdocumento', tipodocumento)
        req.flash('documento', documento)
        req.flash('celular', celular)
        return res.redirect('/dashboard');
      }
    }

    //UserName
    if (!username) {
      req.flash('message', 'Debe ingresar un username valido.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    if (username.length < 3) {
      req.flash('message', 'El username debe ser superior a 3 caracteres.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    if (!isNaN(username)) {
      req.flash('message', 'El username no puede ser una cadena de caracter numerico.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    if (!genero) {
      req.flash('message', 'Debe seleccionar un genero valido.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }
    //nacimiento

    if (!nacimiento) {
      req.flash('message', 'Debe ingresar una fecha de nacimiento valida.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    if (nacimiento.length < 3) {
      req.flash('message', 'Debe ingresar una fecha de nacimiento valida')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    if (edad < 10) {
      req.flash('message', 'Tienes menos de 10 años, por lo que no puedes crear una cuenta')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }
    //Telefono
    if (celular) {
      if (isNaN(celular)) {
        req.flash('message', 'El telefono tiene que ser una cadena de caracter numerico.')
        req.flash('username', username)
        req.flash('email', email)
        req.flash('name', name)
        req.flash('lastname', lastname)
        req.flash('genero', genero)
        req.flash('nacimiento', nacimiento)
        req.flash('tdocumento', tipodocumento)
        req.flash('documento', documento)
        req.flash('celular', celular)
        return res.redirect('/dashboard');
      }

      if (celular.length > 10) {
        req.flash('message', 'Debe ingresar un telefono valido')
        req.flash('username', username)
        req.flash('email', email)
        req.flash('name', name)
        req.flash('lastname', lastname)
        req.flash('genero', genero)
        req.flash('nacimiento', nacimiento)
        req.flash('tdocumento', tipodocumento)
        req.flash('documento', documento)
        req.flash('celular', celular)
        return res.redirect('/dashboard');
      }
    }

    //Tipo documento

    if (!tipodocumento) {
      req.flash('message', 'Debe ingresar un tipo de documento valido')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    if (!documento) {
      req.flash('message', 'Debe ingresar un documento valido')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }

    if (isNaN(documento)) {
      req.flash('message', 'El documento tiene que ser una cadena de caracter numerico.')
      req.flash('username', username)
      req.flash('email', email)
      req.flash('name', name)
      req.flash('lastname', lastname)
      req.flash('genero', genero)
      req.flash('nacimiento', nacimiento)
      req.flash('tdocumento', tipodocumento)
      req.flash('documento', documento)
      req.flash('celular', celular)
      return res.redirect('/dashboard');
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


const validateUser = (req, res, next) => {
  try {
    const { email, password } = req.body;

    //email
    if (!email) {
      req.flash('message', 'Debe ingresar un email valido.')
      req.flash('email', email)
      return res.redirect('/signin');
    }
    if (!validar_email(email)) {
      req.flash('message', 'Debe ingresar un gmail valido (@gmail.com)')
      req.flash('email', email)
      return res.redirect('/signin');
    }

    //Password
    if (!password) {
      req.flash('message', 'Debe ingresar una contraseña valida.')
      req.flash('email', email)
      return res.redirect('/signin');
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const validateProduct = async (req, res, next) => {

  try {
    const products = await product.find();
    if (products.length === 0) {
      req.flash('message', 'Error al encontrar algun producto en la base de datos.')
      return res.redirect('/dashboard');
    }
    next()
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const validateCategory = async (req, res, next) => {

  try {
    const categories = await categor.find();
    if (categories.length === 0) {
      req.flash('error', 'Error al encontrar alguna categoria en la base de datos')
      return res.redirect('/dashboard');
    };
    next()
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const validateOrder = async (req, res, next) => {

  try {
    const order = await orders.find();
    if (order.length === 0) {
      return res.status(401).json({ message: "Error al encontrar alguna orden en la base de datos" })
    }
    next()
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const validateNewOrden = async (req, res, next) => {
  try {
    const { items, phone, address, customerId } = req.body

    const users = await User.find();
    const UserValidator = users.map(use => use.username)

    //phone
    if (!phone) return res.status(401).json({ message: "Debe ingresar un telefono valido" })
    if (phone.length < 7 || phone.length > 10) return res.status(401).json({ message: "El telefono debe tener minimo 7 y maximo 10 caracteres" })
    if (isNaN(phone)) return res.status(401).json({ message: "Debe ingresar un numero telefonico valido." })
    //customerId
    if (!customerId) return res.status(401).json({ message: "(TEST) para un customerId valido, ingresa un username registrado" })
    if (!UserValidator.includes(customerId)) {
      return res.status(400).json({
        message: `(TEST) El username ${customerId} no existe. Use: ${UserValidator}`,
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


const validateEditProduct = async (req, res, next) => {
  try {
    const users = await User.findById({ _id: req.params.id })
    const { name, description, price, category, id, image } = req.body;

    const categories = await categor.find();
    const categoriesValidator = categories.map(categories => categories.name)
    //Name
    if (!name) {
      req.flash('message', 'Debe ingresar un nombre valido.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/edit-product/' + id);
    }
    if (name.length < 3) {
      req.flash('message', 'El nombre del producto debe ser superior a 3 caracteres.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/edit-product/' + id);
    }
    if (!isNaN(name)) {
      req.flash('message', 'El nombre no puede ser una cadena de caracter numerico.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/edit-product/id');
    }
    //Description
    if (!description) {
      req.flash('message', 'Debe ingresar una descripción valida.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      req.flash('image', image);
      return res.redirect('/edit-product/' + id);
    }
    if (description.length < 5) {
      req.flash('message', 'La descripción debe ser superior a 5 caracteres.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/edit-product/' + id);
    }
    if (!isNaN(description)) {
      req.flash('message', 'La descripción no puede ser una cadena de caracter numerico.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/edit-product/' + id);
    }
    //Price
    if (!price) {
      req.flash('message', 'Debe ingresar un precio valido.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/edit-product/' + id);
    }
    if (isNaN(price)) {
      req.flash('message', 'Debe ingresar un precio numerico valido.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/edit-product/' + id);
    }
    //Categories
    if (!category) {
      req.flash('message', 'Debe ingresar una categoria valida.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/edit-product/' + id);
    }
    if (!categoriesValidator.includes(category)) {
      req.flash('message', 'La categoria no existe.')
      req.flash('name', name);
      req.flash('description', description);
      req.flash('price', price);
      req.flash('category', category);
      req.flash('image', image);
      return res.redirect('/edit-product/' + id);
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
function validar_email(email) {
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email) ? true : false;
}

function validar_password(password) {
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  return regex.test(password) ? true : false;
}

module.exports = { validateEditCategory, validateNewProduct, validateNewCategory, validateNewUser, validateUpdateNewUser, validateProduct, validateCategory, validateOrder, validateNewOrden, validateEditProduct, validateUser }

