import express, { Request, Response } from 'express';
import mysql, { ResultSetHeader } from 'mysql2';

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.MSQL_USERNAME,
  password: process.env.MSQL_PASSWORD,
  database: 'my_database'
});

// Test the database connection
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// API to get all users
app.get('/users', (req: Request, res: Response) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
      return;
    }
    res.json(results);
  });
});

// API to add a new user
app.post('/users', (req: Request, res: Response) => {
    const { name, email } = req.body;
    db.query<ResultSetHeader>(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email],
      (err, results) => {
        if (err) {
          res.status(500).json({ error: 'Failed to insert user' });
          return;
        }
        res.status(201).json({ id: results.insertId, name, email });
      }
    );
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
