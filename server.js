const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors');

app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use(cors());

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
    console.log("reading...");
    
    runPy('read', '').then(function (fromRunpy) {
        console.log("fromRunpy", fromRunpy.toString());            
        res.end(fromRunpy);
        console.log("... end reading!");
    }).catch(function(err) {
        console.log("read card error", err);
    });
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
        res.send('no root given');
    }

})


app.listen(PORT, () => console.log('Application listening at http://%s:%s/', HOST, PORT))