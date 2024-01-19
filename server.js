const express = require('express');
const app = express();

const VERSION = process.env.npm_package_version;
const API_TITLE = process.env.npm_package_name;

function genRouter(name) {
    const endpoint = `/${name}`
    console.log(`... creating: ${endpoint}`)
    const r = express.Router()
    r.use(function (_, _, next) {
        console.log(`... calling middleware: ${name} `)
        next()
    })
    r.get( endpoint, (req, res) => {
        console.log(`... calling endpoint: ${name} `)
        const record = {
            name,
        }
        res.status(200).json(record);
    })
    return r;
}

app.use(function (_, _, next) {
    // log new border with each call
    console.log(`------------------------- `)
    next()
})

// GET /alpha
app.use(genRouter('alpha')); // will just call alpha middleware
// GET /beta
app.use(genRouter('beta'));  // will call alpha, beta middleware
// routers have same parent
// GET /v1/gamma
app.use('/v1', genRouter('gamma')); // alpha, beta, gamma mw
// GET /v1/delta
app.use('/v1',genRouter('delta')); // alpha, beta, gamma, delta
// router has unique parent 
// GET /v2/epsilon
app.use('/v2', genRouter('epsolon')); // alpha, beta, epsilon


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`${API_TITLE}@${VERSION}`)
  console.log(`running on ports INTERNAL: ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('\nSIGINT signal received: closing HTTP server')
    server.close(() => {
      console.log('HTTP server closed')
    })
    process.exit();
  })
  
  process.on('SIGTERM', () => {
    console.log('\nSIGTERM signal received: closing HTTP server')
    server.close(() => {
      console.log('HTTP server closed')
    })
    process.exit();
  })