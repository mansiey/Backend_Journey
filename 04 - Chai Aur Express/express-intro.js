const express = require('express');

function block1_basicServer() {
    return new Promise((resolve) => {
        const app = express();
        app.use(express.json());

        app.get('/menu', (req, res) => {
            res.json({
                item: ['Thali', 'Biryani']
            });
        })

        app.get('/search', (req, res) => {
            const { q, limit } = req.query;
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

        const server = app.listen(0, async () => {
            const PORT = server.address().port;
            const base = `http://127.0.0.1:${PORT}`;

            try {
                const menuRes = await fetch(`${base}/menu`);
                const menuData = await menuRes.json();
                console.log('GET/menu:', JSON.stringify(menuData));


                console.log("++++++++++++++++++++++")


                const searchRes = await fetch(`${base}/search?q=Biryani&limit=5`);
                const searchData = await searchRes.json();
                console.log('GET/search', JSON.stringify(searchData));


                console.log("++++++++++++++++++++++")


                const menuIdRes = await fetch(`${base}/menu/42`);
                const menuIdData = await menuIdRes.json();
                console.log('GET/menu/42', JSON.stringify(menuIdData));


                console.log("++++++++++++++++++++++")


                const orderRes = await fetch(`${base}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dish: 'Biryani',
                        quantity: 2
                    })
                })
                const orderData = await orderRes.json();
                console.log('POST/order', JSON.stringify(orderData));
            } catch (err) {
                console.log(err);
            }


            server.close(() => {
                console.log("Block 1 served....");
                resolve();
            })
        })


    })
}

function block2_basicServer(){
    return new Promise((resolve) => {
        const app = express();

        //response types
        app.get('/text', (req, res) => {
            res.send("Hello From ChaiCode")
        })

        app.get('/json', (req, res) => {
            res.json({
                fremwork: 'express',
                version: '6.2.1'
            })
        })

        app.get('/not-found', (req, res) => {
            res.status(404).json({
                error: "Page not found"
            })
        })

        app.get('/health', (req, res) => {
            res.status(200)
        })

        app.get('/old-menu', (req, res) => {
            res.redirect(301, '/new-menu')
        })

        app.get('/xml', (req, res) => {
            res.type('/application/xml').send(<dish> <name> Biryani </name></dish>)
        })

    })
}

async function main() {
    await block1_basicServer();
    await block2_basicServer();

    process.exit(0);
}

main();