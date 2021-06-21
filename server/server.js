const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 4000;
const app = express();
app.use(cors())

// parse requests of content-type application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: !0 }));

app.get('/', (req, res) => {
    res.json({msg: 'welcome to api with node'});
})

require("./routes/drug.routes.js")(app);

app.listen(PORT, _ => {
    console.log(`server is running and listening on port ${PORT}`);
})
