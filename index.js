const app = require('./app');

const PORT = 4000 || process.env.PORT;

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
})

