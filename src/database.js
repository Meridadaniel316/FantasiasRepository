const mongoose = require('mongoose');
 
// mongoose.connect(`mongodb+srv://admin:${process.env.HOST_PASSWORD_DATABASE}@${process.env.HOST_NAME_DATABASE}.2ncxk.mongodb.net/${process.env.HOST_PROJECT_DATABASE}?retryWrites=true&w=majority`, {
//     // useNewUrlParser: true,
//                                                             // useUnifiedTopology: true,
//                                                             // useCreateIndex: true,
//                                                             // useFindAndModify: false
//                                                         })
// const URI = `mongodb+srv://${process.env.HOST_NAME_DATABASE}:${process.env.HOST_PASSWORD_DATABASE}@jardinfantasias-data-ba.2ncxk.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.HOST_PROJECT_DATABASE}`;
const URI = `mongodb+srv://admin:${process.env.HOST_PASSWORD_DATABASE}@jardinfantasias-data-ba.2ncxk.mongodb.net/?retryWrites=true&w=majority&appName=JardinFantasias-Data-Base`;
mongoose.connect(URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
                                                        })
.then(db => console.log('db is connected...'))
.catch(error => console.log(error))