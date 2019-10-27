const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const bd = require('../bd.json');

router.get('/', (req,res) => {
    res.json(bd);
});

`router.get('/:barrio',(req,res) => {
    const {barrio} = req.params;
    const { nombre,padre, madre,telefono } = req.body;
    _.each(bd, (dato, i)=>{
        if(dato.barrio == barrio){
            const rest = (nombre,padre,madre,telefono);
        }
        res.json(rest);
    });
});
`

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