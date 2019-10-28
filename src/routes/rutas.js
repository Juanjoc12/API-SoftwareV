const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const bd = require('../bd.json');

router.get('/', (req,res) => {
    res.json(bd);
});

router.get('/:barrio', (req,res) => {
    const barrios = bd.filter(function(estudiantes){
        return estudiantes.barrio ==  req.params.barrio;
    })
    res.json(barrios);
});

router.get('/estadisticas/barrio', (req, res) => {
    const barrios = [...new Set(bd.map(dato => dato.barrio))]
    const ninosBarrio = barrios.map(barrio => ({
        barrio, cantidad: (bd.filter(est => est.barrio === barrio)).length
    }))
    res.json(ninosBarrio);
});

router.get('/coordenadas/estudiante', (req, res) => {
    const coordenada = bd.map(dato => ({
        nombre: dato.nombre, 
        latitud: dato.latitud,
        longitud: dato.longitud
    }))
    res.json(coordenada);
});


router.post('/', (req, res) => {
    const { id,nombre,padre, madre,barrio,telefono } = req.body;
    if(id && nombre && padre && madre && barrio && telefono){
        _.each(bd, (dato, i)=>{
            if(dato.id == id){
                res.json({error: 'Este usuario ya existe'});
            }else{
                const nuevoNiño = {...req.body, id};
                bd.push(nuevoNiño);  
            }
            res.json(bd); 
        });
    } else { 
        res.status(500).json({error: "Error faltan campos"});
    }
});

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const { barrio,telefono } = req.body;
    if(barrio && telefono){
        _.each(bd, (dato, i) => {
            if(dato.id == id){
                dato.barrio = barrio;
                dato.telefono = telefono;
            }
        });
        res.json(bd);
    }else{
        res.status(500).json({error: 'Error'});
    }
});

router.delete('/:id',(req,res) =>{
    const {id} = req.params;
    _.each(bd, (dato, i)=>{
        if(dato.id == id){
            bd.splice(i,1);
        }
    });
    res.json(bd);
});

module.exports = router;