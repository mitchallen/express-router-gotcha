express-router-gotcha
==


## Usage

```sh
npm start
```

```js
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
app.use('/v2', genRouter('epislon')); // alpha, beta, epsilon
```

```sh 
------------------------- 
... calling middleware: alpha 
... calling endpoint: alpha 
------------------------- 
... calling middleware: alpha 
... calling middleware: beta 
... calling endpoint: beta 
------------------------- 
... calling middleware: alpha 
... calling middleware: beta 
... calling middleware: gamma 
... calling endpoint: gamma 
------------------------- 
... calling middleware: alpha 
... calling middleware: beta 
... calling middleware: gamma 
... calling middleware: delta 
... calling endpoint: delta 
------------------------- 
... calling middleware: alpha 
... calling middleware: beta 
... calling middleware: epsilon 
... calling endpoint: epsilon 