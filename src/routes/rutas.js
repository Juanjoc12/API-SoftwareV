let { Router } = require('express');
let router = Router();
let _ = require('underscore');

let bd = require('../bd.json');

router.get('/', (req,res) => {
    res.json(bd);
});

router.get('/:barrio', (req,res) => {
    let barrios = bd.filter(function(estudiantes){
        return estudiantes.barrio ==  req.params.barrio;
    })
    res.json(barrios);
});

router.get('/estadisticas/barrio', (req, res) => {
    let barrios = [...new Set(bd.map(dato => dato.barrio))]
    let ninosBarrio = barrios.map(barrio => ({
        barrio, cantidad: (bd.filter(est => est.barrio === barrio)).length
    }))
    res.json(ninosBarrio);
});

router.get('/coordenadas/:id', (req, res) => {
    let id = bd.filter(function(estudiantes){
        return estudiantes.id ==  req.params.id;
    });
    let coordenada = {
      'nombre': id[0].nombre,
      'latitud': id[0].latitud,
      'longitud': id[0].longitud
     }
    res.json(coordenada);
});


router.post('/', (req, res) => {
    let { id,nombre,padre, madre,barrio,telefono } = req.body;
    if(id && nombre && padre && madre && barrio && telefono){
        _.each(bd, (dato, i)=>{
            if(dato.id == id){
                res.json({error: 'Este usuario ya existe'});
            }else{
                let nuevoNiño = {...req.body, id};
                bd.push(nuevoNiño);  
            }
            res.json(bd); 
        });
    } else { 
        res.status(500).json({error: "Error faltan campos"});
    }
});

router.put('/:id', (req, res) => {
    let {id} = req.params;
    let { barrio,telefono } = req.body;
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
    let {id} = req.params;
    _.each(bd, (dato, i)=>{
        if(dato.id == id){
            bd.splice(i,1);
        }
    });
    res.json(bd);
});

module.exports = router;