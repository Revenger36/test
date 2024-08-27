const express = require('express')
const rateioRoutes = require('./src/rateio/routes')
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("test api!");
}
)

app.use('/api/v1/', rateioRoutes)


app.listen(port, () => console.log('ok'))