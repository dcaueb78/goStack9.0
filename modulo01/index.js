const express = require('express');

const server = express();

server.use(express.json());

// Query Params = ?teste=1
// Route Params = /users/1
// Request Body = { "name": "caue", "idade": 18 }
// CRUD - Create, Read, Update, Delete

const users = ['Diego', 'Claudio', 'Victor']

server.use((req, res, next)=>{
  console.time('Resquest');
  console.log(`Método ${req.method}; URL: ${req.url}; `);

  next();

  console.timeEnd('Resquest');
})

function checkUserExists(req, res, next) {
  if(!req.body.name){
    return res.status(400).json({ error: 'Username is required' })
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user){
    return res.status(400).json({ error: 'User does not exists' })
  }
  req.user = user;

  return next();
}

server.get('/users', (req, res)=>{
  return res.json(users);
})

server.get('/users/:index', checkUserInArray, (req, res)=>{
  // const nome = req.query.nome;
  const { index } = req.params;

  return res.json(req.user);
})

server.post('/users', checkUserExists ,(req, res)=>{
  const { name } = req.body;

  users.push(name);
  
  return res.json(users);
})

server.put('/users/:index', checkUserInArray, checkUserExists ,(req, res)=>{
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json(users);  
})

server.delete('/users/:index', checkUserInArray, (req, res)=>{
  const { index } = req.body;
  users.splice(index, 1);

  return res.send();
})



server.listen(3000);