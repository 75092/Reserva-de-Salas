const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulação de base de dados com 1 utilizador administrador
const users = [
  {
    id: 1,
    nome: "Bruno Mendes",
    email: "brunomendes.ccii@gmail.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin"
  }
];

// Chave secreta do JWT (em produção, usa variável de ambiente)
const JWT_SECRET = "segredo-muito-seguro";

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.f
