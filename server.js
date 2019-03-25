const express = require('express')
const app = express()
const path = require('path');

app.use(express.static(path.join(__dirname, 'frontend/dist')));

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;

const runPy = (cmd, root) => {
    return new Promise(function (success, nosuccess) {

        const { spawn } = require('child_process');
        const pyprog = spawn('python', ['./packing-station.py', cmd, root]);

        pyprog.stdout.on('data', function (data) {

            success(data);
        });

        pyprog.stderr.on('data', (data) => {

            nosuccess(data);
        });
    });
}

app.get('/', (req, res) => {
    res.sendFile(__dirname, 'frontend/dist/index.html');
});

app.get('/read', (req, res) => {
    let root = req.query.root
    console.log("root", root);

    if (root) {

        res.send(root)
        runPy('read', root).then(function (fromRunpy) {
            console.log(fromRunpy.toString());            
            res.end(fromRunpy);
        });
    } else {
        res.send('no root given\n');
    }

})

app.get('/write', (req, res) => {
    let root = req.query.root
    console.log("root", root);
    
    if (root) {

        res.send(root)
        runPy('write', root).then(function (fromRunpy) {
            console.log(fromRunpy.toString());
            res.end(fromRunpy);
        });
    } else {
        res.send('no root given\n');
    }

})


app.listen(PORT, () => console.log('Application listening at http://%s:%s/', HOST, PORT))