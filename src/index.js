const express = require('express');
const app = express();
const { PORT } = require('./config/serverConfig')

const apiRoutes = require('./routes/index');

app.use(express.json());


const setupAndStartServer = () => {

    app.use('/api',apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    })
}

setupAndStartServer();

