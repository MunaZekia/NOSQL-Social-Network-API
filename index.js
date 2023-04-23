const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const db = require("./config/connection");
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once('open', () => {
    app.listen(port, ()=> 
    console.log('now listening on port ${port}'))
});