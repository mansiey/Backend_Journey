const express = require('express');

function block1_basicServer(){
    return new Promise((res) => {
        const app = express();

        app.use(express.json());

        app.get('/menu', (req, res) => {
            res.json({
                item: ['Thali', 'Biryani']
            });
        })

        app.get('/search', (req, res) => {
            const {q, limit} = req.query;
            res.json({
                query: q,
                limit: limit || 10
            })
        })

        app.get('/menu/:id', (req, res) => {
            const { id } = req.params;
            res.json({
                item: id,
                price: 199
            })
        })

        app.post('/order', (req, res) => {
            const order = req.body;
            res.status(201).json({
                status: 'Received',
                order
            })
        })

        const server = app.listen(0, async() => {
            const port = server.address().PORT;
            const base = `127.0.0.1:${port}`;

            try {
                const menuRes = await fetch(`${base}/menu`);
                const menuData = menuRes.json();
                console.log('GET/menu:', JSON.stringify(menuData));
            } catch ( err ) {
                
            }
        })


    })
}

function main(){
    await block1_basicServer();

    process.exit(0);
}

main();