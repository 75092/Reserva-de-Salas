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

// Usuário administrador mock (simulando o que virá do banco)
const adminUser = {
  id: 1,
  name: 'Bruno Mendes',
  email: 'brunomendes.ccii@gmail.com',
  passwordHash: bcrypt.hashSync('admin123', 10),
  role: 'admin'
};

// JWT secret
const JWT_SECRET = 'secret-chave-muito-segura';

// Endpoint de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email !== adminUser.email) {
    return res.status(401).json({ message: 'Email inválido' });
  }

  const isPasswordValid = bcrypt.compareSync(password, adminUser.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Senha incorreta' });
  }

  const token = jwt.sign({ id: adminUser.id, role: adminUser.role }, JWT_SECRET, {
    expiresIn: '1h'
  });

  res.json({ token, user: { name: adminUser.name, email: adminUser.email, role: adminUser.role } });
});

// Teste protegido
app.get('/api/protegido', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(403);

  try {
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: 'Acesso autorizado', user: decoded });
  } catch (err) {
    res.sendStatus(403);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando em http://localhost:${PORT}`);
});
