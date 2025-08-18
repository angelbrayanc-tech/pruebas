const express = require('express');
const app = express();
const puerto = 3000;

app.get('/', (req, res) => {
    res.send('Ruta de inicio');
    console.log("Aviso para Adm");
});

app.listen(puerto, () => {
    console.log(`Servidor levantado en puerto ${puerto}`);
});

