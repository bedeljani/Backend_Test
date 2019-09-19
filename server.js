const   express = require('express')
        bodyParser = require('body-parser')
        cors = require('cors')
        erroHandelr = require('errorhandler')
        morgan = require('morgan')
        require('dotenv').config()
        app = express()


const   port = process.env.PORT || 9100 
const product = require('./routes/product')
//MiddleWare
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


// logger
app.use(morgan('dev'));

// routes
app.use('/products', product)


// Send message for default URL
app.get('/', (req, res) => res.send('API SUCCESS !'));


app.listen(port, () => console.log(`Listening on port ${port}!`))