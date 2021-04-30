const mongoose = require('mongoose');
require('colors');


/* -------------------------------------------------------------------------- */
/*                             Conexion a MongoDB                             */
/* -------------------------------------------------------------------------- */

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('\nBase de datos en linea'.magenta);

    } catch (error) {
        console.log(error);

        throw new Error('Error al inicializar la base de datos'.red);
    }

}

module.exports = {dbConnection};