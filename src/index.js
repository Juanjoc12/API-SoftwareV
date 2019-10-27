const express = require('express');
const app = express();
const morgan = require('morgan');

//configuracion
app.set('port',process.env.PORT || 3000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev')); // informacion en consola(peticiones)
app.use(express.urlencoded({extended: false})); //entender los datos 
app.use(express.json()); //soporta los json

//rutas
app.use('/api/ninos',require('./routes/rutas'));

//Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
});