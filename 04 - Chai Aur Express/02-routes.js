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


    //Put method to replace the data
    app.put('/routes/:id', (req, res) => {
        const id = req.params.id;
        if(!routes[id]){
            return res.status(404).json({error: 'Something went wrong'});
        }

        routes[id] = {id: Number(id), ...req.body};

        res.status(200).json(routes[id]);
    })

    //Patch to update the data
    app.patch('/routes/:id', (req, res) => {
        const id = req.params.id;

        if(!routes[id]){
            return res.status(404).json({error: "something went wrong!"});
        }

        routes[id] = {...routes[id], ...req.body};

        res.status(200).json(routes[id]);
    })

    //delete method to delete the route
    app.delete('/routes/:id', (req, res) => {
        const id = req.params.id;
        if(!routes[id]){
            return res.status(404).json({Error: "routes was not found"});
        }

        delete routes[id];

        // res.status(200).json({message: "Deleted Successfully!"});
        res.status(204).end();       //better 
    }) 

    const server = app.listen(0, async () => {
        const PORT = server.address().port;
        const base = `http://127.0.0.1:${base}`;

        const listRes = await fetch(`${base}/routes`);
        const listData = await listRes.json();
        console.log('All the trains are :', JSON.stringify(listData));
        console.log('++++++++++++++++++++++++')


        const createRes = await fetch(`${base}/routes`, {
            method: POST,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                name: 'Dadar-Wadala local',
                direction: 'East'
            }
        });

        const createData = await createRes.json();
        console.log('Added Route: ', JSON.stringify(createData));
    })
}