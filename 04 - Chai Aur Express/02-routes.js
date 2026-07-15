const express = require('express');

function block1_httpMethods(){
    const app = express();
    app.use(express.json());

    //make train routes DB
    const routes = {
        1 : {
            id : 1,
            name : 'Andheri-Dadar Local',
            direction : 'North',
        },
        2 : {
            id : 2,
            name : 'Bandra-Kurla Local',
            direction : 'East',
        }
    }

    let nextId = 3;     //to add new routes in DB

    //List all the trains:
    app.get('/routes', (req, res)=>{
        res.json(Object.values(routes));
    })

    //single train by id
    app.get('/rotes/:id', (req, res) => {
        const {id} = req.params;
        const route = routes[id];

        if(!route){
            return res.status(404).json({err: "No trains Available on this id"});
        }

        res.json();
    })


    //Add new route to the DB
    app.post('/routes', (req, res) => {
        //no varification, no zod
        const newRoute = {id : nextId++, ...req.body};
        routes[newRoute.id] = newRoute;
        res.status(201).json(newRoute);
    })


    const server = app.listen(0, async () => {
        
    })
}