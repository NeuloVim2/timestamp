const express   = require('express'),
      app       = express(),
      timestamp = require('./timestamp'),
      port      = 3000;

// simple logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
})

// timestamp router
app.use('/api/timestamp', timestamp);

// get statics
app.use(express.static('public'))

// get index.html
app.get('/', ( req, res ) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.listen( port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
});