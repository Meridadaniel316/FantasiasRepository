const { Schema, model } = require('mongoose')
const script = require('bcryptjs')

const studentSchema = new Schema({
    estadoEstudiante: {
        type: Boolean,
        unique: false,
    },
    gradomatricula: {
        type: String,
        unique: false,
    },
    tipoModalidad: {
        type: String,
        unique: false,
    },
    tipoJornada: {
        type: String,
        unique: false,
    },
    gradoinforme: {
        type: String,
        unique: false,
    },
    lastYearStudied: {
        type: String,
        unique: false,
    },
    lastInstitution: {
        type: String,
        unique: false,
    },
    lateGrade: {
        type: String,
        unique: false,
    },
    estudiante: {
        type: String,
        unique: false,
    },
    genero: {
        type: String,
        unique: false,
    },
    niup: {
        type: String,
        unique: false,
    },
    pasaporte: {
        type: String,
        unique: false,
    },
    paisexpedicion: {
        type: String,
        unique: false,
    },

    fechanto: {
        type: String,
        unique: false,
    },
    rh: {
        type: String,
        unique: false,
    },
    telfijo: {
        type: String,
        unique: false,
    }, 
    padre: [{
        ref: "user",
        type: Schema.Types.ObjectId
    }],
    madre: [{
        ref: "user",
        type: Schema.Types.ObjectId
    }],
    direccion: {
        type: String,
        unique: false,
    },
    barrio: {
        type: String,
        unique: false,
    },
    numCasaApart: {
        type: String,
        unique: false,
    },
    tipoVivienda: {
        type: String,
        unique: false,
    },
    municipioCiudad: {
        type: String,
        unique: false,
    },
    departamento: {
        type: String,
        unique: false,
    },
    eps: {
        type: String,
        unique: false,
    },
    epsConsulta: {
        type: String,
        unique: false,
    },
    paisNacimiento: {
        type: String,
        unique: false,
    },
    ciudadNacimiento: {
        type: String,
        unique: false,
    },
    fechaNacimiento: {
        type: String,
        unique: false,
    },
    status: {
        type: String,
        unique: false,
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('student', studentSchema);