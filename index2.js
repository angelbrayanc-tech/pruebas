const express = require('express');
const mysql = require('mysql2');
const app = express();
const puerto = 3000;

app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',  
    password: '1234',   
    database: 'veterinaria', 
    port: 3307
});

conexion.connect((err) => {
    if (err) {
        console.error(' Error de conexión a MySQL:', err.message);
        return;
    }
    console.log(' Conexión exitosa a MySQL');
});


app.get('/personas', (req, res) => {
    const sql = 'SELECT * FROM personas';
    conexion.query(sql, (err, resultados) => {
        if (err) {
            console.error(' Error en la consulta:', err.message);
            res.status(500).json({ error: 'Error en la consulta' });
        } else {
            res.json(resultados);
        }
    });
});

app.get('/personas/:id', (req, res) => {
    const { id } = req.params; 
    const sql = 'SELECT * FROM personas WHERE persona_id = ?';

    conexion.query(sql, [id], (err, resultados) => {
        if (err) {
            console.error(' Error en la consulta:', err.message);
            res.status(500).json({ error: 'Error en la consulta' });
        } else if (resultados.length === 0) {
            res.status(404).json({ mensaje: 'Persona no encontrada' });
        } else {
            res.json(resultados[0]); 
        }
    });
});


app.listen(puerto, () => {
    console.log(` Servidor corriendo en http://localhost:${puerto}`);
});
