const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root001', // ← pon tu contraseña aquí si tienes
  database: 'lista_tareas'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.use(bodyParser.json());

// Obtener tareas
app.get('/tareas', (req, res) => {
  db.query('SELECT * FROM tareas', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener tareas');
    } else {
      res.json(results);
    }
  });
});

// Agregar tarea
app.post('/tareas', (req, res) => {
  const { descripcion } = req.body;
  db.query('INSERT INTO tareas (descripcion) VALUES (?)', [descripcion], (err) => {
    if (err) {
      res.status(500).send('Error al agregar tarea');
    } else {
      res.status(201).send('Tarea agregada');
    }
  });
});

// Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tareas WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).send('Error al eliminar tarea');
    } else {
      res.send('Tarea eliminada');
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
